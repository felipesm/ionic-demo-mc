import { JwtHelper } from 'angular2-jwt';
import { StorageService } from './storageservice';
import { LocalUser } from './../models/localuser';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciaisDTO';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: HttpClient, public storage: StorageService) {

    }

    authenticate(credencial: CredenciaisDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`, credencial, 
        {
            observe: 'response',
            responseType: 'text'
        });
    }

    refreshToken() {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh-token`, {}, 
        {
            observe: 'response',
            responseType: 'text'
        });
    }

    sucessfulLogin(authorization : string) {
        let tokenAuth = authorization.substring(6);
        let user : LocalUser = {
            token: tokenAuth,
            email: this.jwtHelper.decodeToken(tokenAuth).sub
        };

        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }
    
}