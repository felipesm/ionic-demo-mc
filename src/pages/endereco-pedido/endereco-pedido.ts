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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];
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

}
