import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produtoDTO';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[] = [];
  pagina : number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingController: LoadingController,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    this.carregarDados();
  }

  carregarDados() {
    let idCategoria = this.navParams.get('idCategoria');

    let loader = this.presentLoading();
    this.produtoService.listarPorCategoria(idCategoria, this.pagina, 10)
      .subscribe(response => {
        this.items = this.items.concat(response['content']);
        loader.dismiss();
      },
      error => {
        loader.dismiss();
      }
    );
  }

  presentLoading() {
    let loader = this.loadingController.create({
      content: 'Aguarde...'
    });

    loader.present();
    return loader;
  }

  doRefresh(event) {
    this.pagina = 0;
    this.items = [];
    this.carregarDados();

    setTimeout(() => {
      event.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {

    this.pagina++;
    this.carregarDados();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

  mostrarDetalhesProduto(idProduto : string) {
    this.navCtrl.push('ProdutoDetailPage', {idProduto: idProduto});
  }
}
