import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "./../../models/categoriaDTO";
import { Observable } from 'rxjs/Rx';


@Injectable()
export class CategoriaService {

    constructor(public http: HttpClient) {
    }

    listar() : Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}