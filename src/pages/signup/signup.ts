import { EstadoDTO } from './../../models/estadoDTO';
import { EstadoService } from './../../services/domain/estado.service';
import { CidadeService } from './../../services/domain/cidade.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
      public estadoService: EstadoService) {

        this.formGroup = this.formBuilder.group({
          nome: ['' , [Validators.required, Validators.minLength(2), Validators.maxLength(130)]],
          email: ['', [Validators.required, Validators.email]],
          tipo: ['1', [Validators.required]],
          cpfCnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
          senha: ['', [Validators.required]],
          logradouro: ['', [Validators.minLength(6)]],
          numero: ['', []],
          complemento: ['', [Validators.minLength(2)]],
          bairro: ['', [Validators.minLength(2)]],
          cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
          celular: ['', [Validators.required, Validators.minLength(11)]],
          telefonefixo: ['', [Validators.minLength(10)]],
          telefoneresidencial: ['', [Validators.minLength(10)]],
          estadoId: [null, [Validators.required]],
          cidadeId: [null, [Validators.required]]
        });
  }

  ionViewDidLoad(){
   this.estadoService.listar()
    .subscribe(response => {
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.atualizarCidades();
    },
    error => {})
  }

  atualizarCidades() {
    let idEstado = this.formGroup.value.estadoId;
    this.cidadeService.listar(idEstado)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error => {})
  }

  signupUser() {
    console.log("Log enviado");
  }
}
