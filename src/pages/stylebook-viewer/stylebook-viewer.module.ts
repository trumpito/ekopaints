import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StylebookViewerPage } from './stylebook-viewer';

@NgModule({
  declarations: [
    StylebookViewerPage,
  ],
  imports: [
    IonicPageModule.forChild(StylebookViewerPage),
  ],
  exports: [
    StylebookViewerPage
  ]
})
export class StylebookViewerPageModule {}
