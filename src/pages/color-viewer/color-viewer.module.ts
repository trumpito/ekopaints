import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ColorViewerPage } from './color-viewer';

@NgModule({
  declarations: [
    ColorViewerPage,
  ],
  imports: [
    IonicPageModule.forChild(ColorViewerPage),
  ],
  exports: [
    ColorViewerPage
  ]
})
export class ColorViewerPageModule {}
