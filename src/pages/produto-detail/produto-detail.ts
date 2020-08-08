import { CarrinhoService } from './../../services/domain/carrinho.service';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produtoDTO';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;
 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public carrinhoService: CarrinhoService) {
  }

  ionViewDidLoad() {
    let idProduto = this.navParams.get('idProduto');

    this.produtoService.pesquisarProduto(idProduto)
      .subscribe(response => {
        this.item = response;
      },
      error => {}
    );
  }

  adicionarProduto(produto: ProdutoDTO) {
    this.carrinhoService.adicionarProdutoNoCarrinho(produto);
    this.navCtrl.setRoot('CarrinhoPage');
  }

}
