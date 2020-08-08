import { ProdutoDTO } from './../../models/produtoDTO';
import { CarrinhoService } from './../../services/domain/carrinho.service';
import { ItensCarrinho } from './../../models/itensCarrinho';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  itens: ItensCarrinho[];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public carrinhoService: CarrinhoService) {
  }

  ionViewDidLoad() {
    let carrinho = this.carrinhoService.retornarCarrinho();
    this.itens = carrinho.itens;
  }

  removerProduto(produto: ProdutoDTO) {
    this.itens = this.carrinhoService.removerProdutoNoCarrinho(produto).itens;
  }

  incrementarProduto(produto: ProdutoDTO) {
    this.itens = this.carrinhoService.incrementarQuantidadeNoCarrinho(produto).itens;
  }

  decrementarProduto(produto: ProdutoDTO) {
    this.itens = this.carrinhoService.decrementarQuantidadeNoCarrinho(produto).itens;
  }

  total() : number {
    return this.carrinhoService.retornarTotal();
  }

  continuarComprando() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  checkout() {
    this.navCtrl.push('EnderecoPedidoPage')
  }

}
