import { API_CONFIG } from '../../config/api.config';
import { CidadeDTO } from './../../models/cidadeDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';


@Injectable()
export class CidadeService {

    constructor(public http: HttpClient) {
    }

    listar(idEstado: string) : Observable<CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${idEstado}/cidades`);
    }

}