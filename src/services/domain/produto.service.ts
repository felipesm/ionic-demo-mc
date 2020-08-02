import { API_CONFIG } from './../../config/api.config';
import { ProdutoDTO } from './../../models/produtoDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class ProdutoService {

    constructor(public http : HttpClient) {
    }
    
    pesquisarProduto(idProduto: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/${idProduto}`);
    }

    listarPorCategoria(idCategoria: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos?categorias=${idCategoria}`);
    }

}