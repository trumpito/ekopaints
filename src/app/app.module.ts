import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CalculatorPage } from '../pages/calculator/calculator';
import { ColorsPage } from '../pages/colors/colors';
import { ColorPopover } from '../pages/colors/colors';
import { StylebooksPage } from '../pages/stylebooks/stylebooks';
import { ProjectsPage } from '../pages/projects/projects';
import { ProjectPopover } from '../pages/projects/projectPopover';
import { SelectProject } from '../pages/projects/projectPopover';
import { CreateProject } from '../pages/projects/projects';
import { ConsultantPage } from '../pages/consultant/consultant';
import { ContractorPage } from '../pages/contractor/contractor';
import { ContactForm } from '../pages/contact-form/contact-form';
import { Preview } from '../pages/preview/preview';
import { ProductPage } from '../pages/products/products';
import { ProductInfo } from '../pages/product-info/product-info';
import { StylebookViewerPage } from '../pages/stylebook-viewer/stylebook-viewer';
import { ColorViewerPage } from '../pages/color-viewer/color-viewer';
import { UploadPage } from '../pages/upload/upload';

import { CalculatorModule } from '../pages/calculator/calculator.module';
import { ColorsModule } from '../pages/colors/colors.module';
import { StylebooksModule } from '../pages/stylebooks/stylebooks.module';
import { ProjectsModule } from '../pages/projects/projects.module';
import { ProjectPopoverModule } from '../pages/projects/projectPopover.module';
import { ConsultantModule } from '../pages/consultant/consultant.module';
import { ContractorModule } from '../pages/contractor/contractor.module';
import { ContactFormModule } from '../pages/contact-form/contact-form.module';
import { PreviewModule } from '../pages/preview/preview.module';
import { ProductPageModule } from '../pages/products/products.module';
import { ProductInfoModule } from '../pages/product-info/product-info.module';
import { StylebookViewerPageModule } from '../pages/stylebook-viewer/stylebook-viewer.module';
import { ColorViewerPageModule } from '../pages/color-viewer/color-viewer.module';
import { UploadPageModule } from '../pages/upload/upload.module';

import { PaintProductsService } from '../providers/paint-products.service';
import { ColorsService } from '../providers/colors.service';
import { ProjectService } from '../providers/projects.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Diagnostic, Camera, ImagePicker } from 'ionic-native';
import { CameraPreview } from '@ionic-native/camera-preview';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HTTP } from '@ionic-native/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
   /* ColorsPage, */ 
    ColorPopover, /*
    ProductPage,
    ProductInfo,
    StylebooksPage,
    ProjectsPage, */
    CreateProject,
    SelectProject,/*
    ProjectPopover,
    CalculatorPage, 
    ConsultantPage,
    ContractorPage,
    ContactForm,
    StylebookViewerPage,
    ColorViewerPage,
    Preview,
    UploadPage*/
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CalculatorModule,
    ColorsModule,
    StylebooksModule,
    ProjectsModule,
    ProjectPopoverModule,
    ConsultantModule,
    ContractorModule ,
    ContactFormModule,
    PreviewModule,
    ProductPageModule,
    ProductInfoModule,
    StylebookViewerPageModule,
    ColorViewerPageModule,
    UploadPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ColorsPage,
    ColorPopover,
    ProductPage,
    ProductInfo,
    StylebooksPage,
    ProjectPopover,
    SelectProject,
    ProjectsPage,
    CreateProject,
    CalculatorPage,
    ConsultantPage,
    ContractorPage,
    ContactForm,
    StylebookViewerPage,
    ColorViewerPage,
    Preview,
    UploadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    Camera,
    ImagePicker,
    Diagnostic,
    CameraPreview,
    InAppBrowser,
    HTTP,
    PaintProductsService,
    ProjectService,
    ColorsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
