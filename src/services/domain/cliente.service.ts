import { StorageService } from './../storageservice';
import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ClienteDTO } from '../../models/clienteDTO';

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storage: StorageService) {
    }    

    findByEmail(email: string) : Observable<ClienteDTO> {

        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    inserir(cliente: ClienteDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/clientes`,
         cliente, 
         {
             observe: 'response',
             responseType: 'text'   
         });
    }
}