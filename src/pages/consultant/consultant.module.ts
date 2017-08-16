import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultantPage } from './consultant';

@NgModule({
  declarations: [
    ConsultantPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultantPage),
  ],
  exports: [
    ConsultantPage
  ]
})
export class ConsultantModule {}
