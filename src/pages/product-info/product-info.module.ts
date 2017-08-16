import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductInfo } from './product-info';

@NgModule({
  declarations: [
    ProductInfo,
  ],
  imports: [
    IonicPageModule.forChild(ProductInfo),
  ],
  exports: [
    ProductInfo
  ]
})
export class ProductInfoModule {}
