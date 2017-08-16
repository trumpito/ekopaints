import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Platform } from 'ionic-angular';

import { ScreenOrientation } from '@ionic-native/screen-orientation';

/**
 * Generated class for the StylebookViewerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-stylebook-viewer',
  templateUrl: 'stylebook-viewer.html',
})
export class StylebookViewerPage {   
    title: string;
    length: Array<number>;
    landscape: boolean;
    isLastSlide: boolean;
    isFirstSlide: boolean;
    showControls: boolean = false;
    timeout: any;
    timeoutLength: number = 3 * 1000;
    @ViewChild(Slides) slides: Slides;
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public plt: Platform, public screenOrientation: ScreenOrientation) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      this.title = navParams.data.title;
      this.length = Array(navParams.data.length).fill(0).map((x,i)=>i);
      this.landscape = plt.isLandscape() || plt.height() < plt.width() || true;
      this.isFirstSlide = true;
      this.isLastSlide = false;
      this.toggleControls();
  }

     ionViewDidLoad() {
         console.log('ionViewDidLoad StylebookViewerPage');
      }
     ionViewWillLeave(){
         this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
     }
     nextSlide(){
          this.slides.slideNext();
          this.keepControlsAlive();
      }
     previousSlide(){
          this.slides.slidePrev();
          this.keepControlsAlive();
      }
     goBack(){
          this.navCtrl.pop();
      }
     toggleControls(){
         if(this.showControls){
             if(this.timeout){
                 clearTimeout(this.timeout);
                 this.timeout=null;
             }
         } else {
             this.timeout = setTimeout(()=>{
                 this.toggleControls();
             }, this.timeoutLength);
         }
         this.showControls=!this.showControls;
     }
     keepControlsAlive(){
         if(this.timeout){
             clearTimeout(this.timeout);
             this.timeout = setTimeout(()=>{
                 this.toggleControls();
             }, this.timeoutLength);
         }
     }
     updateSlide(){
         this.isLastSlide = this.slides.isEnd();
         this.isFirstSlide = this.slides.isBeginning();
     }
}

