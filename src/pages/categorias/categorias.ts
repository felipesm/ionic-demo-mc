import { CategoriaDTO } from './../../models/categoriaDTO';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
    this.categoriaService.listar()
      .subscribe(response => {
        this.items = response;
      },
      error => {});
  }

  mostrarProdutos(idCategoria : string) {
    this.navCtrl.push('ProdutosPage', {idCategoria: idCategoria});
  }

}
