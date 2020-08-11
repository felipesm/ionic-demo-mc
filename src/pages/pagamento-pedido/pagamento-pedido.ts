import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PedidoDTO } from './../../models/pedidoDTO';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pagamento-pedido',
  templateUrl: 'pagamento-pedido.html',
})
export class PagamentoPedidoPage {

  pedido: PedidoDTO;

  parcelas: number[] = [1, 2, 3, 4, 5];

  linhaDigitavel: string = "23711111212333333333133344444441145670001000000";

  formGroup: FormGroup; 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.pedido = this.navParams.get('pedido');

      this.formGroup = this.formBuilder.group({
        numeroCartao: ['', [Validators.pattern("^[0-9]*$"), Validators.minLength(16), Validators.maxLength(16)]],
        numeroParcelas: [1, [Validators.required]],
        linhaDigitavel: [this.linhaDigitavel, [Validators.pattern("^[0-9]*$"), Validators.minLength(47), Validators.maxLength(47)]],
        "@type": ["pagamentoComCartao", Validators.required]
      });
  }

  finalizarPedido() {
    this.pedido.pagamento = this.formGroup.value;
    this.navCtrl.setRoot('ConfirmacaoPedidoPage', {pedido: this.pedido});  
  }

}
