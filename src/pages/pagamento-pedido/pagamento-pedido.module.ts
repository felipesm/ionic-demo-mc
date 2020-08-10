import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagamentoPedidoPage } from './pagamento-pedido';

@NgModule({
  declarations: [
    PagamentoPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(PagamentoPedidoPage),
  ],
})
export class PagamentoPedidoPageModule {}
