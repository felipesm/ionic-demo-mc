import { StorageService } from './../services/storageservice';

import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage : StorageService, public alert : AlertController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((error, caught) => {

                let errorObj = error;
                if (errorObj.error) {
                    errorObj = errorObj.error;
                }

                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }

                console.log(errorObj);

                switch(errorObj.status) {
                    case 401:
                        this.handle401();
                        break;
                    case 403:
                        this.handle403();
                        break;
                    case 404:
                        this.handle404();
                        break;
                    default:
                        this.handleDefaultError(errorObj);
                        break;                    
                }

                return Observable.throw(errorObj);
            }) as any;
    }
    
    handle401() {
        let alertControl = this.alert.create({
            title: 'Falha na autenticação',
            message: 'Email ou senha inválidos.',
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });

        alertControl.present();
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

    handle404() {
        let alertControl = this.alert.create({
            title: 'Página não encontrada',
            message: 'Ihh que feio, favor tentar acessar mais tarde.',
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });

        alertControl.present();
    }

    handleDefaultError(errorObj) {
        let alertControl = this.alert.create({
            title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });

        alertControl.present();
    }

};

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};