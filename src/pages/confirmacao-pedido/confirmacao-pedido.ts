import { PedidoService } from './../../services/domain/pedido.service';
import { ClienteService } from './../../services/domain/cliente.service';
import { EnderecoDTO } from './../../models/enderecoDTO';
import { ClienteDTO } from './../../models/clienteDTO';
import { CarrinhoService } from './../../services/domain/carrinho.service';
import { ItensCarrinho } from './../../models/itensCarrinho';
import { PedidoDTO } from './../../models/pedidoDTO';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-confirmacao-pedido',
  templateUrl: 'confirmacao-pedido.html',
})
export class ConfirmacaoPedidoPage {

  pedido: PedidoDTO;
  itensCarrinho: ItensCarrinho[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  codigoPedido: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clienteService: ClienteService,
    public carrinhoService: CarrinhoService,
    public pedidoService: PedidoService) {

    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.itensCarrinho = this.carrinhoService.retornarCarrinho().itens;
    
    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.buscarEndereco(this.pedido.endereco.id, response['enderecos']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      })
  }

  private buscarEndereco(idEndereco: string, enderecos: EnderecoDTO[]) : EnderecoDTO {
    let position = enderecos.findIndex(x => x.id == idEndereco);
    return enderecos[position];
  }

  calcularTotal() {
    return this.carrinhoService.retornarTotal();
  }

  checkout() {
    this.pedidoService.gravarPedido(this.pedido)
      .subscribe(response => {
        this.carrinhoService.criarOuLimparCarrinho();
        this.codigoPedido = this.obterIdPedido(response.headers.get('location'));
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  voltarParaCarrinho() {
    this.navCtrl.setRoot('CarrinhoPage');
  }

  voltarParaCategorias() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  private obterIdPedido(location: string) : string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }

}
