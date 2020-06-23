import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciaisDTO';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {

    constructor(public http: HttpClient) {

    }

    authenticate(credencial: CredenciaisDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`, credencial, 
        {
            observe: 'response',
            responseType: 'text'
        });
    }
}