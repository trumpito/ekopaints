import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ColorsPage } from './colors';

@NgModule({
  declarations: [
    ColorsPage,
  ],
  imports: [
    IonicPageModule.forChild(ColorsPage),
  ],
  exports: [
    ColorsPage
  ]
})
export class ColorsModule {}
