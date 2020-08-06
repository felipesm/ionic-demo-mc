import { ProdutoDTO } from './../../models/produtoDTO';
import { Carrinho } from './../../models/carrinho';
import { StorageService } from './../storageservice';
import { Injectable } from "@angular/core";

@Injectable()
export class CarrinhoService {

    constructor(public storage: StorageService) {
    }

    criarOuLimparCarrinho() : Carrinho {
        let carrinho: Carrinho = {itens: []};
        this.storage.setCarrinho(carrinho);

        return carrinho;
    }

    retornarCarrinho() : Carrinho {
        let carrinho : Carrinho = this.storage.getCarrinho();

        if (carrinho == null) {
            carrinho = this.criarOuLimparCarrinho();
        }

        return carrinho;
    }

    adicionarProdutoNoCarrinho(produto: ProdutoDTO) : Carrinho {
        let carrinho = this.retornarCarrinho();
        let position = carrinho.itens.findIndex(x => x.produto.id == produto.id);

        if (position == -1) {
            carrinho.itens.push({quantidade: 1, produto: produto});
        }

        this.storage.setCarrinho(carrinho);

        return carrinho;
    }
}