import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produtoDTO';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let idCategoria = this.navParams.get('idCategoria');

    this.produtoService.listarPorCategoria(idCategoria)
      .subscribe(response => {
        this.items = response['content'];
      },
      error => {}
    );
  }

  mostrarDetalhesProduto(idProduto : string) {
    this.navCtrl.push('ProdutoDetailPage', {idProduto: idProduto});
  }
}
