import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, ModalController } from 'ionic-angular';

import { ProjectService } from '../../providers/projects.service';
import { CreateProject } from '../projects/projects';

@IonicPage()
@Component({
    selector: 'page-project-popover',
    templateUrl: 'project-popover.html'
})
 export class ProjectPopover {
     
     color: any;
     picture: any;
     type: string;
     projects: Array<any> = [];
     
     constructor(public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, public prjSrv: ProjectService){
         this.type = this.navParams.data.type;
         if(this.navParams.data.type == 'color'){
             this.color = this.navParams.data.color;
             this.prjSrv.getProjects().then((data)=>{
                 (data as any).forEach((obj)=>{
                     this.projects.push({project: obj, hasColor: this.prjSrv.hasColor(obj,this.color)});
                 });
             });
         } else if(this.navParams.data.type == 'picture'){
             this.picture = this.navParams.data.picture;
             this.prjSrv.getProjects().then((data)=>{
                 (data as any).forEach((obj)=>{
                     this.projects.push({project: obj, hasPicture: this.prjSrv.hasPicture(obj,this.picture)});
                 });
             });
         }
     }
     
     dismiss(){
         this.viewCtrl.dismiss();
     }
     addColor(proj){
         this.prjSrv.addColor(this.color, proj).then(()=>{
             let projIndex = this.projects.findIndex((obj)=>{
             return obj.project == proj;
         });
            this.projects[projIndex].hasColor = true;
         }).catch((reason)=>{
             console.error(reason);
         });
     }
     removeColor(proj){
         this.prjSrv.removeColor(this.color, proj).then(()=>{
             let projIndex = this.projects.findIndex((obj)=>{
             return obj.project == proj;
         });
            this.projects[projIndex].hasColor = false;
         }).catch((reason)=>{
             console.error(reason);
         });
     }
     addPicture(proj){
         this.prjSrv.addPicture(this.picture, proj).then(()=>{
             let projIndex = this.projects.findIndex((obj)=>{
             return obj.project == proj;
         });
            this.projects[projIndex].hasPicture = true;
         }).catch((reason)=>{
             console.error(reason);
         });
     }
     removePicture(proj){
         console.log("removing pic");
         this.prjSrv.removePicture(this.picture, proj).then(()=>{
             let projIndex = this.projects.findIndex((obj)=>{
             return obj.project == proj;
         });
            this.projects[projIndex].hasPicture = false;
         }).catch((reason)=>{
             console.error(reason);
         });
     }
     createProject(){
         let modal = this.modalCtrl.create(CreateProject, {type: this.type, color:this.color, picture:this.picture});
         modal.present();
         modal.onDidDismiss(proj=>{
            if(this.type == 'color') {
                this.projects.push({project:proj, hasColor: true });
            } else if(this.type == 'picture'){
                this.projects.push({project:proj, hasPicture: true });
            }
         });
     }
     
 }
 
@Component({selector: 'page-select-project',templateUrl: 'select-project.html'})

export class SelectProject {
    
    projects: any = [];
    constructor(private navParams: NavParams, private viewCtrl: ViewController, private prjSrv: ProjectService){
        this.prjSrv.getProjects().then(data=>{
            this.projects = data;
        });
    }
    
    selectProject(proj){
        this.viewCtrl.dismiss(proj);
    }
}