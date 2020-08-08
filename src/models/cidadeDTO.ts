import { EstadoDTO } from './estadoDTO';

export interface CidadeDTO {
    id: string;
    nome: string;
    estado?: EstadoDTO;
}