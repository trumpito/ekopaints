import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Preview } from '../preview/preview';
/**
 * Generated class for the Calculator page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html',
})
export class CalculatorPage {
    
    widget: boolean = false;
    
    metric:boolean = false;
    coats: number = 2;
    coverage: number = 350;
    area: number = 0;
    
    length: number;
    width: number;
    height: number;
    doors: number;
    windows: number;
    gallons: number = 0;
    quarts: number = 0;
    calculated: boolean = false;
    
  previewPage: any = Preview;
   
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    if(this.navParams.data){
        this.widget = this.navParams.data.widget;
    }   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Calculator');
  }
  calculate(){
      if(!this.length || !this.width || !this.height || !this.windows || !this.doors ) return;
      this.calculated=true;
      let surf = 2 * this.length * this.height + 2 * this.width * this.height - 21 * this.doors - 12 * this.windows;
      this.area = Math.max(Math.round(surf), 0);
      let cover = this.coats * (surf/this.coverage);
      cover = Math.max(cover, 0);
      this.gallons = Math.floor(cover);
      let quarts = cover % 1;
      quarts = Math.ceil(quarts/.25);
      if( quarts === 4){
          quarts = 0;
          this.gallons = this.gallons+1;
      }
      this.quarts = quarts;
  }
  getSize(){
      this.viewCtrl.dismiss(this.area);
  }
    dismiss(){
        this.viewCtrl.dismiss();
    }
}
