import { Component } from '@angular/core';
import { ColorPopover } from '../colors/colors';
import { IonicPage, NavController, NavParams, ViewController, PopoverController } from 'ionic-angular';

/**
 * Generated class for the ColorViewerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-color-viewer',
  templateUrl: 'color-viewer.html',
})
export class ColorViewerPage {
    color: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public popoverCtrl: PopoverController) {
      this.color=navParams.data;
      console.log(this.color);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ColorViewerPage');
  }
    dismiss() {
        this.viewCtrl.dismiss();
  }
    openPopover(color){
        let popover = this.popoverCtrl.create(ColorPopover, color, {'cssClass':'color-popover'});
        popover.present();
    }

}
