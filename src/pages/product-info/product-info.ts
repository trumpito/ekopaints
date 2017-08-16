import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ProductInfo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product-info',
  templateUrl: 'product-info.html',
})
export class ProductInfo {
  product: any;
line: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
      this.product = this.navParams.data.product;
      this.line = this.navParams.data.line;
      //console.log(this.product);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductInfo');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
