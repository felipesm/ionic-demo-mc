import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storageservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/clienteDTO';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response;
          this.cliente.imageUrl = './../../assets/imgs/icon_avatar.png';
        },
        error => {});
    }
  }
}
