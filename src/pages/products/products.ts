import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { Preview } from '../preview/preview';
import { ProductInfo } from '../product-info/product-info';
import { PaintProductsService } from '../../providers/paint-products.service';

/**
 * Generated class for the Products page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductPage {
    
    previewPage: any = Preview;
    
    products: any;
    productInfoPage: any = ProductInfo;
    paints: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private paintServ: PaintProductsService) {
      this.paints = paintServ.getProducts();
      this.products= this.paints[0].title;
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }
    
  showDetails(product, line){
      let modal = this.modalCtrl.create(this.productInfoPage, {"product":product,"line":line});
      modal.present();
  }

}
