import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContractorPage } from './contractor';

@NgModule({
  declarations: [
    ContractorPage,
  ],
  imports: [
    IonicPageModule.forChild(ContractorPage),
  ],
  exports: [
    ContractorPage
  ]
})
export class ContractorModule {}
