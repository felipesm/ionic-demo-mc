import { ItemPedidoDTO } from './itemPedidoDTO';
import { PagamentoDTO } from './pagamentoDTO';
import { RefDTO } from './refDTO';

export interface PedidoDTO {
    cliente: RefDTO;
    endereco: RefDTO;
    pagamento: PagamentoDTO;
    itens: ItemPedidoDTO[]; 
}