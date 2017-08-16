import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { UploadPage } from '../upload/upload';

/**
 * Generated class for the Contractor page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contractor',
  templateUrl: 'contractor.html',
})
export class ContractorPage {
    
  amount: number;
  uploadUrl: string = "https://www.contractorrewards.com/contractorrewards/upload.action";
  //uploadUrl: string = "https://www.google.com";
  email: string;
  pictures: Array<string> = [];
  browser: any;
  hasPicture: boolean = false;
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, private iab: InAppBrowser) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Contractor');
     //this.browser = this.iab.create(this.uploadUrl,'_blank', "location=no,hidden=yes");
     this.browser = this.iab.create(this.uploadUrl,'_system');
  }
  openUpload(){
       /* let popover=this.popoverCtrl.create(UploadPage,{},{cssClass:'upload-popover'});
        popover.present();
        popover.onDidDismiss((data)=>{
            this.pictures = data;
            this.hasPicture= true;
        });*/
      this.browser.show();
    }
  sendReward(){
      
  }
}
