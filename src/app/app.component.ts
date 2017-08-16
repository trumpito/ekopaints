import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { InAppBrowser } from '@ionic-native/in-app-browser';

//import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';
import { CalculatorPage } from '../pages/calculator/calculator';
import { ColorsPage } from '../pages/colors/colors';
import { StylebooksPage } from '../pages/stylebooks/stylebooks';
import { ProjectsPage } from '../pages/projects/projects';
import { ConsultantPage } from '../pages/consultant/consultant';
import { ContractorPage } from '../pages/contractor/contractor';
import { ProductPage } from '../pages/products/products';
import { Preview } from '../pages/preview/preview';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    
  @ViewChild(Nav) nav: Nav;
  //rootPage: any = Preview;
  rootPage: any = ProjectsPage;
  //rootPage: any = ContractorPage;
  //rootPage: any = ColorsPage;
   
  activePage: any = this.rootPage;
  uploadUrl: string = "https://www.contractorrewards.com/contractorrewards/upload.action";
  contractorPage: any = {title: 'Contractor Rewards', component: ContractorPage};


  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public screenOrientation: ScreenOrientation, public iab: InAppBrowser) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
     // { title: 'Home', component: HomePage },
      { title: 'Projects', component: ProjectsPage },
      { title: 'Colors', component: ColorsPage },
      { title: 'Style Books', component: StylebooksPage },
      { title: 'Product Line', component: ProductPage },
      { title: 'Paint Calculator', component: CalculatorPage },
      { title: 'Help', component: ConsultantPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page.component;
  }
   openContractorRewards(){
       this.iab.create(this.uploadUrl,'_system');
   }
   checkActive(page){
       return page.component == this.activePage;
   }
}
