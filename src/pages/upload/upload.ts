import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Diagnostic } from 'ionic-native';
import { Camera } from 'ionic-native';

/**
 * Generated class for the UploadPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
    
  pictures: Array<string> = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public toastCtrl: ToastController, public diagnostic: Diagnostic, public camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }
    checkCamera(){
        Diagnostic.isCameraAuthorized().then((permission)=>{
            if(permission){
                this.openCamera();
            } else {
                Diagnostic.requestCameraAuthorization().then((status)=>{
                    if(status == Diagnostic.permissionStatus.GRANTED){
                        this.openCamera();
                    } else {
                        let toast = this.toastCtrl.create({
                            message: 'Cannot Open Camera: Need Camera Permission',
                            duration: 3000,
                            position: 'bottom'
                        });
                        toast.present();
                    }
                })
            }
        });
    }
    openCamera(){
        let options = {
          quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          encodingType: Camera.EncodingType.JPEG,
          mediaType: Camera.MediaType.PICTURE,
          correctOrientation: false
        }
        Camera.getPicture(options).then((imageData)=>{
            this.pictures.push('data:image/jpeg;base64,'+imageData);
            this.dismiss(this.pictures);
        }, (err)=>{
            
        });
    }
    checkPicker(){
        Diagnostic.isCameraAuthorized().then((permission)=>{
            if(permission){
                this.openPicker();
            } else {
                Diagnostic.requestCameraAuthorization().then((status)=>{
                    if(status == Diagnostic.permissionStatus.GRANTED){
                        this.openPicker();
                    } else {
                        let toast = this.toastCtrl.create({
                            message: 'Cannot Open Camera: Need Camera Permission',
                            duration: 3000,
                            position: 'bottom'
                        });
                        toast.present();
                    }
                })
            }
        });
    }
    openPicker(){
        let options = {
          quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          encodingType: Camera.EncodingType.JPEG,
          mediaType: Camera.MediaType.PICTURE,
          sourceType: 0,
          correctOrientation: false
        }
        Camera.getPicture(options).then((imageData)=>{
            this.pictures.push('data:image/jpeg;base64,'+imageData);
            this.dismiss(this.pictures);
        }, (err)=>{
            
        });
    }
    dismiss(data){
        this.viewCtrl.dismiss(data);
    }
}
