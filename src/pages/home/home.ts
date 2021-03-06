import { AuthService } from './../../services/authservice';
import { CredenciaisDTO } from './../../models/credenciaisDTO';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credencial: CredenciaisDTO = {
    email: '',
    senha: ''
  };

  constructor(public navCtrl: NavController, public menu: MenuController, public auth: AuthService) {

  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);   
  }
  
  ionViewDidEnter(){
    this.auth.refreshToken()
    .subscribe(response => {
      this.auth.sucessfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});
  }

  login() {
    this.auth.authenticate(this.credencial)
    .subscribe(response => {
      this.auth.sucessfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});
  }

  signup() {
    this.navCtrl.push('SignupPage')
  }
}
