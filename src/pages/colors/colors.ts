import { Component, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { IonicPage, NavController, NavParams, Platform, ModalController, PopoverController, ViewController } from 'ionic-angular';
import { Preview } from '../preview/preview';
import { ColorsService }  from '../../providers/colors.service';
import { ProjectService }  from '../../providers/projects.service';
import { ColorViewerPage } from '../color-viewer/color-viewer';
import { ProjectPopover } from '../projects/projectPopover';
/**
 * Generated class for the Colors page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-colors',
  templateUrl: 'colors.html',
})
export class ColorsPage {   
    
  previewPage: any = Preview;
  showFamilies: boolean = true;  
  asPopover: boolean = false;
  family: string;
  families: Array<Array<string>> = [
      ["yellow","blue","green"],
      ["red","purple","orange"],
      ["brown","gray","white"],
      
  ];
    colors: any;
    searchColors: any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public clrSrv: ColorsService, private sanitizer: DomSanitizer, public popoverCtrl: PopoverController, public modalCtrl: ModalController, public viewCtrl: ViewController ) {
     if(navParams.data.family){
         this.family = navParams.data.family;
         this.colors = clrSrv.getFamily(this.family); 
         if(this.family == "gray"){
             console.log("adding black");
             this.colors = clrSrv.getFamily('black').concat(this.colors);
         }
         this.colors.sort((a,b)=>{
             return ((a.number> b.number) ? 1 : ((a.number<b.number)? -1: 0));
         });
         this.showFamilies = false;
     }
      if(navParams.data.asPopover){
          this.asPopover = true;
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Colors');
  }
  selectFamily(color){
      if(!this.asPopover){
          this.navCtrl.push(ColorsPage, {family: color});
      } else {
          this.viewCtrl.dismiss({family: color});
      }
      
  }
  sanitizeColor(color){
      return this.sanitizer.bypassSecurityTrustStyle('#'+color);
  }
    openPopover(color){
        let popover = this.popoverCtrl.create(ColorPopover, color, {'cssClass':'color-popover'});
        popover.present();
    }
    dismiss(color){
        if(typeof color == 'boolean'){
            this.viewCtrl.dismiss({goBack:true});
        } else {
            this.viewCtrl.dismiss({goBack:false, color: color});
        }
    }
    goBack(){
        this.dismiss(true);
    }
    getColors(ev){
        let val = ev.target.value;
        if(val && val.trim() != ''){
            this.searchColors = this.clrSrv.getAllColors(val);
        } else {
            this.clearColors();
        }  
    }
    clearColors(){
        this.searchColors = null;
    }
}

@Component({
  template: `
    <div class="colorBox">
        <div class="colorButtons">
            <button ion-button icon-only clear large color="pink" (click)="openProjectPopover($event)" #projectBtn ><ion-icon name="ios-heart" [isActive]="inProject"></ion-icon></button>
            <button ion-button icon-only clear large color="pink" (click)="openDetailPage(color)"><ion-icon name="expand"></ion-icon></button>
        </div>
        <div class="colorSquare" [style.backgroundColor]="sanitizeColor(color.hex)">
            <div class="colorInfo" [style.color]="color.contrastColor== 'dark'? '#333': '#EEE'">
                <span>{{color.name}}</span> 
                <br>
                <span>{{color.number}}</span>
            </div>
        </div>
    </div>
  `
})
export class ColorPopover {
    
  @ViewChild('projectBtn') projectBtn: any; 
    
  color: any;
  inProject: boolean;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private plt: Platform, private sanitizer: DomSanitizer, public modalCtrl: ModalController, public clrSrv: ColorsService, public popoverCtrl: PopoverController, public prjSrv: ProjectService) {
      this.color = this.clrSrv.getColor(this.navParams.data.number);
      this.updateIcon();
      this.prjSrv.projectHasChanged.subscribe((status) => {
         if(status.update){
             this.updateIcon();
         } 
      });
  }

  close() {
    this.viewCtrl.dismiss();
  }
  sanitizeColor(color){
      return this.sanitizer.bypassSecurityTrustStyle('#'+color);
  }
    updateIcon(){
        this.prjSrv.isColorUsed(this.color).then((value)=>{
          this.inProject = value as boolean;
      });
    }
   openDetailPage(color){
       this.close();
        let modal = this.modalCtrl.create(ColorViewerPage, this.color);
        modal.present();
    }
    openProjectPopover(event){
        let projectRect = this.projectBtn._elementRef.nativeElement.getBoundingClientRect();
        let popover = this.popoverCtrl.create(ProjectPopover, {color: this.color, type:'color'}, {cssClass:'project-popover'});
        if(this.plt.is('ios')){
            popover.present({ev:event});
        } else {
            popover.present({
                ev: {
                    target: {
                        getBoundingClientRect: ()=>{
                            return {
                                top: projectRect.top + projectRect.height-10,
                                left: projectRect.left - Math.round(window.innerWidth*.6/2) -Math.round(projectRect.width/2) + 65
                            }
                        }
                    }
                }
            }); 
        }
    }
}