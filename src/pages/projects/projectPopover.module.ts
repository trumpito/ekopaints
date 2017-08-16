import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectPopover } from './projectPopover';

@NgModule({
  declarations: [
    ProjectPopover,
  ],
  imports: [
    IonicPageModule.forChild(ProjectPopover),
  ],
  exports: [
    ProjectPopover
  ]
})
export class ProjectPopoverModule{}
