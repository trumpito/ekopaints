import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Preview } from './preview';

@NgModule({
  declarations: [
    Preview,
  ],
  imports: [
    IonicPageModule.forChild(Preview),
  ],
  exports: [
    Preview
  ]
})
export class PreviewModule {}
