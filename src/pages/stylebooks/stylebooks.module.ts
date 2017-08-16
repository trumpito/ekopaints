import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StylebooksPage } from './stylebooks';

@NgModule({
  declarations: [
    StylebooksPage,
  ],
  imports: [
    IonicPageModule.forChild(StylebooksPage),
  ],
  exports: [
    StylebooksPage
  ]
})
export class StylebooksModule {}
