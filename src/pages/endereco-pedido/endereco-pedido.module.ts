import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnderecoPedidoPage } from './endereco-pedido';

@NgModule({
  declarations: [
    EnderecoPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(EnderecoPedidoPage),
  ],
})
export class EnderecoPedidoPageModule {}
