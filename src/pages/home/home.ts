import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Preview } from '../preview/preview';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  previewPage: any = Preview;
  constructor(public navCtrl: NavController) {

  }

}
