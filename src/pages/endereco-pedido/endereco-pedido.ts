import { CarrinhoService } from './../../services/domain/carrinho.service';
import { PedidoDTO } from './../../models/pedidoDTO';
import { StorageService } from './../../services/storageservice';
import { LocalUser } from './../../models/localuser';
import { ClienteService } from './../../services/domain/cliente.service';
import { EnderecoDTO } from './../../models/enderecoDTO';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-endereco-pedido',
  templateUrl: 'endereco-pedido.html',
})
export class EnderecoPedidoPage {

  items: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public carrinhoService: CarrinhoService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];

          let carrinho = this.carrinhoService.retornarCarrinho();

          this.pedido = {
            cliente: {id: response['id']},
            endereco: null,
            pagamento: null,
            itens: carrinho.itens.map(x => {
              return {quantidade: x.quantidade, produto: {id: x.produto.id}}
            })
          }
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        });
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  selecionaPagamento(endereco: EnderecoDTO) {
    this.pedido.endereco = {id: endereco.id};
    console.log(this.pedido);
  }

}
