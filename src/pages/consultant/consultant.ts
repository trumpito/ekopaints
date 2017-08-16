import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Preview } from '../preview/preview';
import { ContactForm } from '../contact-form/contact-form';
/**
 * Generated class for the Consultant page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant',
  templateUrl: 'consultant.html',
})
export class ConsultantPage {
    
  previewPage: any = Preview;
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Consultant');
  }
  showContactForm(){
      let modal = this.modalCtrl.create(ContactForm);
      modal.present();
  }
}

