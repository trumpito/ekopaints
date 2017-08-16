import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Preview } from '../preview/preview';
import { StylebookViewerPage } from '../stylebook-viewer/stylebook-viewer';
/**
 * Generated class for the Stylebooks page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-stylebooks',
  templateUrl: 'stylebooks.html',
})
export class StylebooksPage {
  previewPage: any = Preview;
  stylebooks: Array<{title: string, length: number}> = [
      {"title": "USBen", "length": 10 },
      {"title": "USTimelessNeutrals", "length": 10 },
      {"title": "USGentleWhites", "length": 10 },
      {"title": "USDramaticDeeps", "length": 10 },
      {"title": "USFreshPales", "length": 10 },
      {"title": "USAffinity", "length": 12 },
      {"title": "USHistorical", "length": 10 },
      {"title": "Williamsburg", "length": 10 },
      {"title": "USColorTrends2016", "length": 22 },
      {"title": "USColorTrends2015", "length": 22 },
      {"title": "USColorTrends14", "length": 30 },
      {"title": "USExterior", "length": 8 },
      {"title": "USGrandEntrance", "length": 10 },
      {"title": "USRevive", "length": 8 },
      {"title": "USArborcoat", "length": 16 }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Stylebooks');
  }
  openBook(book){
      this.navCtrl.push(StylebookViewerPage, book);
  }
}
