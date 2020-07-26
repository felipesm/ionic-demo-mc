import { ClienteService } from './../../services/domain/cliente.service';
import { EstadoDTO } from './../../models/estadoDTO';
import { EstadoService } from './../../services/domain/estado.service';
import { CidadeService } from './../../services/domain/cidade.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeDTO } from '../../models/cidadeDTO';
import { ThrowStmt } from '@angular/compiler';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      public cidadeService: CidadeService,
      public estadoService: EstadoService,
      public clienteService: ClienteService,
      public alert: AlertController) {

        this.formGroup = this.formBuilder.group({
          nome: ['' , [Validators.required, Validators.minLength(2), Validators.maxLength(130)]],
          email: ['', [Validators.required, Validators.email]],
          tipoCliente: ['1', [Validators.required]],
          numeroInscricao: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
          senha: ['', [Validators.required]],
          logradouro: ['', [Validators.minLength(6)]],
          numero: ['', []],
          complemento: ['', [Validators.minLength(2)]],
          bairro: ['', [Validators.minLength(2)]],
          cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
          telefoneCelular: ['', [Validators.required, Validators.minLength(11)]],
          telefoneFixo: ['', [Validators.minLength(10)]],
          telefoneComercial: ['', [Validators.minLength(10)]],
          idEstado: [null, [Validators.required]],
          idCidade: [null, [Validators.required]]
        });
  }

  ionViewDidLoad(){
   this.estadoService.listar()
    .subscribe(response => {
      this.estados = response;
      this.formGroup.controls.idEstado.setValue(this.estados[0].id);
      this.atualizarCidades();
    },
    error => {})
  }

  atualizarCidades() {
    let idEstado = this.formGroup.value.idEstado;
    this.cidadeService.listar(idEstado)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.idCidade.setValue(null);
      },
      error => {})
  }

  signupUser() {
    this.clienteService.inserir(this.formGroup.value)
      .subscribe(response => {
        this.messageOK();
      },
      error => {});
  }

  messageOK() {
    let alertControl = this.alert.create({
      title: 'Cadastro Cliente',
      message: 'Cliente cadastrado com sucesso!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });

    alertControl.present();
  }
}
