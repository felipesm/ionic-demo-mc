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
        } else {
            carrinho = this.incrementarQuantidadeNoCarrinho(produto);
        }

        this.storage.setCarrinho(carrinho);

        return carrinho;
    }

    removerProdutoNoCarrinho(produto: ProdutoDTO) : Carrinho {
        let carrinho = this.retornarCarrinho();
        let position = carrinho.itens.findIndex(x => x.produto.id == produto.id);

        if (position != -1) {
            carrinho.itens.splice(position, 1);
        }

        this.storage.setCarrinho(carrinho);

        return carrinho;
    }

    incrementarQuantidadeNoCarrinho(produto: ProdutoDTO) : Carrinho {
        let carrinho = this.retornarCarrinho();
        let position = carrinho.itens.findIndex(x => x.produto.id == produto.id);

        if (position != -1) {
            carrinho.itens[position].quantidade++;
        }

        this.storage.setCarrinho(carrinho);

        return carrinho;
    }

    decrementarQuantidadeNoCarrinho(produto: ProdutoDTO) : Carrinho {
        let carrinho = this.retornarCarrinho();
        let position = carrinho.itens.findIndex(x => x.produto.id == produto.id);

        if (position != -1) {
            carrinho.itens[position].quantidade--;

            if (carrinho.itens[position].quantidade < 1) {
                carrinho = this.removerProdutoNoCarrinho(produto);
            }
        }

        this.storage.setCarrinho(carrinho);

        return carrinho;
    }

    retornarTotal() : number {
        let carrinho = this.retornarCarrinho();
        let totalCarrinho = 0;

        for (var i = 0; i < carrinho.itens.length; i++) {
            totalCarrinho += carrinho.itens[i].produto.preco * carrinho.itens[i].quantidade;
        }

        return totalCarrinho;
    }
}