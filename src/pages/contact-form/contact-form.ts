import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, PopoverController, LoadingController, ToastController } from 'ionic-angular';

import { SelectProject } from '../projects/projectPopover';

import { HTTP } from '@ionic-native/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import * as emailConfig from '../../assets/data/email.config.json';
//import SparkPost from 'sparkpost';
import email from 'emailjs';


/**
 * Generated class for the ContactForm page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contact-form',
  templateUrl: 'contact-form.html',
})
export class ContactForm {
    descriptor: any;
    descriptorArray: Array<String> = [
        "amazing",
        "awesome",
        "cool",
        "excellent",
        "fantastic",
        "incredible",
        "mind-blowing",
        "magnificent",
        "marvelous",
        "wonderful"
    ];
    name: string;
    email: string;
    phone: any;
    description: string;
    contractors: any = [
        {"label":"Remodeling", "name": "remodeling", "state": false},
        {"label":"Sheet Rock Repair", "name": "sheetrock", "state": false},
        {"label":"Staining", "name": "staining", "state": false},
        {"label":"Power Washing", "name": "powerwashing", "state": false},
        {"label":"Dry Wall", "name": "drywall", "state": false},
        {"label":"Siding", "name": "siding", "state": false},
        {"label":"Flooring", "name": "flooring", "state": false}
    ];
    project: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public popoverCtrl: PopoverController, public toastCtrl: ToastController, public loadCtrl: LoadingController, private http: Http) {
      this.descriptor = this.descriptorArray[Math.round(Math.random() * this.descriptorArray.length)];
      //this.populateData();
      //console.dir(email);
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactForm');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
    sendDetails(){
        let template = `
            <html>
                <body style="font-family:Verdana, Sans;">
                    <h3 style="border-bottom: solid 2px #ff3366;padding:4px;font-weight:normal;">{{NAME}}</h3>
                    <h3 style="border-bottom: solid 2px #ff3366;padding:4px;font-weight:normal;">{{EMAIL}}</h3>
                    <h3 style="border-bottom: solid 2px #ff3366;padding:4px;font-weight:normal;">{{PHONE}}</h3>
                    <div style="background-color:#BBB;">
                        <h3 style="padding:7px;font-weight:normal;">Services Needed</h3>
                    </div>
                    {{SERVICES}}
                    <h3 style="font-weight:normal;">Description</h3>
                    <p>{{DESCRIPTION}}</p>
                </body>
            </html>
        `;
        let data = {
            name: this.name,
            email: this.email,
            phone: this.phone || "No Phone Number Provided",
            description: this.description
        }
        let contractors= "";
        for(let i = 0; i<this.contractors.length; i++){
            if(this.contractors[i].state){
                contractors+='<br><div style="display:inline-block;background-color:#ff3366;width:10px;height:10px;border-radius:50%"></div> <h3 style="font-weight:normal;display:inline-block">'+this.contractors[i].label+'</h3>';
            }
        }
        if(contractors.length < 1){
            contractors = "No Services Required";
        }
        let load = this.loadCtrl.create({
            content: "Sending Message"
        });
        template = template.replace('{{SERVICES}}', contractors);
        for(let prop in data){
            if(data.hasOwnProperty(prop)){
                template = template.replace('{{'+prop.toUpperCase()+'}}', data[prop]);
            }
        }
       //let sparkpost = new SparkPost(emailConfig.url);
        load.present().then(()=>{
            /*let server = email.server.connect({
                user: 'SMTP_Injection',
                password: '8bc0925e1d24d84ad6161c04266108ef40050ae8',
                host: 'smtp.sparkpostmail.com',
                tls: true
            });
            server.send({
                text: 'I hope this works',
                from: 'Toba Shoyombo <toba@shoyombo.com>',
                to: 'Toba Shoyombo <t.shoyom@gmail.com>',
                subject: 'testing emailjs'
            }, function(err, message){
                load.dismiss();
                console.log(err || message);
            }); */
            
            this.http.post(emailConfig.url, JSON.stringify({
                auth: emailConfig.auth,
                //data: "<html><body><pre>"+JSON.stringify(data,null,4)+"</pre></body></html>"
                data: template
            }), new RequestOptions({
                headers: new Headers({
                    "Content-type": "application/json"
                    //"Accept": "application/json"
                })
            }) ).toPromise().then((res)=>{
                load.dismiss();
                //let body = res.json();
                let body = res;
                console.log(body || {});
                console.log("details sent", data);
                let toast = this.toastCtrl.create({
                    message: 'Message Sent',
                    duration: 3000,
                  });
                toast.present();
                this.dismiss();
            }).catch(err=>{
                console.error(err);
                load.dismiss();
                let toast = this.toastCtrl.create({
                    message: 'Error Sending Message',
                    duration: 3000,
                  });
                toast.present();
            }); 
            /*let html =   "<html><body><h3>test: test@test.com: No Phone Number</h3></body></html>";
            let emailData = {
                  campaign_id: emailConfig.campaign,
                  recipients: 
                    {
                      address: emailConfig.to
                    },
                  content: {
                    from: {
                      name: emailConfig.name,
                      email: emailConfig.from
                    },
                    subject: emailConfig.subject,
                    html: html
                  }
                };
            console.log(JSON.stringify(emailData,null,4));*/
           /* sparkpost.transmissions.send(emailData).then((res)=>{
                console.log(res);
                let toast = this.toastCtrl.create({
                    message: 'Message Sent',
                    duration: 3000,
                  });
                toast.present();
                this.dismiss();
            }).catch((err)=>{
                console.error(err);
                load.dismiss();
                let toast = this.toastCtrl.create({
                    message: 'Error Sending Message',
                    duration: 3000,
                  });
                toast.present();
            }) */
            /*this.http.post(emailConfig.url, JSON.stringify(emailData), {
                "Content-type": "application/json",
                "Accept": "application/json", 
                "Authorization": emailConfig.api_key
            }).then((res)=>{
                load.dismiss();
                let body = res.data;
                console.log(body || {});
                console.log("details sent", data);
                let toast = this.toastCtrl.create({
                    message: 'Message Sent',
                    duration: 3000,
                  });
                toast.present();
                this.dismiss();
            }).catch(err=>{
                console.error(err);
                load.dismiss();
                let toast = this.toastCtrl.create({
                    message: 'Error Sending Message',
                    duration: 3000,
                  });
                toast.present();
            });  */
        });
    }
    selectProject(){
        let popover = this.popoverCtrl.create(SelectProject, {}, {'cssClass': 'select-popover'});
        popover.present();
        popover.onDidDismiss((data)=>{
            if(data!=null){
                this.project = data;
            }
        });
    }
    populateData(){
        this.name = "test";
        this.email = "test@test.com";
        this.description = "My project is soooo cool";
        this.contractors[0].state=true;
        this.contractors[2].state=true;
        this.contractors[3].state=true;
        this.contractors[6].state=true;
        
    }
}
