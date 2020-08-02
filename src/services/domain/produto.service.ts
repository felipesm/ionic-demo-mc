import { API_CONFIG } from './../../config/api.config';
import { ProdutoDTO } from './../../models/produtoDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProdutoService {

    constructor(public http : HttpClient) {
    }

    listarPorCategoria(idCategoria: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos?categorias=${idCategoria}`);
    }
}