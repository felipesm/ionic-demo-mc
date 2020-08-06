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

  items: ItensCarrinho[];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public carrinhoService: CarrinhoService) {
  }

  ionViewDidLoad() {
    let carrinho = this.carrinhoService.retornarCarrinho();
    this.items = carrinho.itens;
  }

}
