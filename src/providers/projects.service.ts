import { Injectable, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';

import { ColorsService } from './colors.service';

@Injectable()

export class ProjectService {
    
    numberOfProjects: number = 0;
    prefix: string = "proj";
    projectHasChanged: EventEmitter<any> = new EventEmitter();
    
    //projects: Array<{name: string, selected: boolean, pictures: Array<string>, colors: Array<string>}>; 
    
    constructor(private storage: Storage, private clrSrv: ColorsService) {
        this.storage.keys().then((data)=>{
           let ids = data.filter((obj)=>{
               return obj.substr(0,this.prefix.length) == this.prefix;
           });
            ids.forEach((obj)=>{
               this.numberOfProjects = Math.max(this.numberOfProjects, Number(obj.substr(this.prefix.length))); 
            });
        });
        
    }
    
    selectProject(id?){
        return new Promise((res, rej)=>{
            let ID;
            if(typeof id == "string"){
                ID = id;
            } else if(id == undefined){
                this.getProjects().then((data)=>{
                    let dat = (data as any);
                  if(dat.length > 0){
                      console.log(dat[0].id);
                      this.storage.get(dat[0].id).then((item)=>{
                          item.selected = true;
                          this.storage.set(item.id, item).then(()=>{
                              this.projectHasChanged.emit({create: false, delete: false, update: true,id: item.id});
                              return res("Selected default");
                          });
                      });
                  } else {
                      return res("No more projects");
                  }  
                });
            } else if(id.id != null) {
                ID = id.id;
            } else {
                return rej("Invalid type: " + id+ " or " + id.id + " Expected String or Project Object" );
            }
            if(ID) this.storage.get(ID).then((data)=>{
                this.getProjects().then((projs)=>{
                    (projs as Array<{id: string, selected: boolean, name: string, colors: Array<string>, pictures: Array<string>}>).forEach((obj)=>{
                        if(obj.id != ID){
                            obj.selected = false;
                            this.storage.set(obj.id, obj);
                        } else {
                            data.selected = true;
                            this.storage.set(data.id, data).catch((reason)=>{
                                return rej(reason);
                            });
                        }
                        this.projectHasChanged.emit({create: false, delete: false, update: true,id: ID});
                        return res("success");
                   });
                    data.selected = true;
                    
                });
            }).catch((reason)=>{
                return rej("Invalid ID or " + reason);
            });
        });
    }
    getProjects(){
        return new Promise((res, rej)=>{
           let projects = [];
           this.storage.forEach((val, key) => {
           if(key.substr(0,this.prefix.length) == this.prefix) {
               projects.push(val);
           }
        }).then(()=>{
               return res(projects);
           }); 
        });
        
    }
    getProject(id?){
        return new Promise((res, rej)=>{
            let ID;
            if(typeof id == "string"){
                ID = id;
            } else if(id.id != null) {
                ID = id.id;
            } else if(typeof id == undefined){
                this.getProjects().then((data)=>{
                  let proj = (data as Array<{id: string, selected: boolean, name: string, colors: Array<any>, pictures: Array<string>}>).find((obj)=>{
                      return obj.selected;
                  });
                    if(proj != undefined){
                        return res(proj)
                    } else {
                        return rej("No projects available");
                    }    
                });      
            } else {
                return rej("Invalid type: " + id+ " or " + id.id + " Expected String or Project Object" );
            }
            this.getProjects().then((data)=>{
                let proj = (data as Array<{id: string, selected: boolean, name: string, colors: Array<Object>, pictures: Array<string>}>).find((obj)=>{
                    return obj.id == ID;
                });
                if(proj != undefined){
                    return res(proj);
                } else {
                   return rej("No project found for ID: "+ID); 
                }   
            });
        })
    }
    
    hasColor(proj, color){
        if(typeof color == "object"){
            color = color.number;
        }
        for(let prop in proj.colors){
            if(proj.colors[prop].number == color){
                return true;
            }
        }
        return false;
    }
    hasPicture(proj, pic){
        for(let prop in proj.pictures){
            if(proj.pictures[prop] == pic){
                return true;
            }
        }
        return false;
    }
    isColorUsed(color, selected?){
        if(typeof color == 'object'){
            color = color.number;
        }
        return new Promise((res,rej)=>{
            if(selected){
                this.getProject().then((proj)=>{
                    return res(this.hasColor(proj,color));
                }).catch();
            } else {
                this.getProjects().then((data)=>{
                    let dat = (data as Array<{id: string, selected: boolean, name: string, colors: Array<any>, pictures: Array<string>}>);
                    let proj = dat.findIndex((obj)=>{
                        return this.hasColor(obj, color); 
                    });
                    if(proj < 0){
                       return res(false);
                    } else {
                        return res(true);
                    } 
                         
                }); 
            }
           
        });
    }
    
    updateSize(size, proj?){
        return new Promise((res, rej)=>{
            this.getProject(proj).then((data)=>{
                let dat = (data as {id: string, size: any, selected: boolean, name: string, colors: Array<Object>, pictures: Array<string>});
                dat.size = size;
                this.storage.set(dat.id, dat).then(()=>{
                    this.projectHasChanged.emit({create: false, delete: false, update: true,id: dat.id});
                    return res();        
                }).catch((reason)=>{
                    return rej(reason);
                })
            }).catch((reason)=>{
                return rej(reason);
            });
        });
    }
    addColor(color, proj?){
        if(typeof color == "string"){
            color = this.clrSrv.getColor(color);
        }
        return new Promise((res, rej)=>{
            let col = this.clrSrv.getColor(color.number);
            this.getProject(proj).then((data)=>{
                let dat = (data as {id: string, selected: boolean, name: string, colors: Array<object>, pictures: Array<string>});
                if(!this.hasColor(dat, col)){
                    dat.colors.push(col);
                    this.storage.set(dat.id, dat).then(()=>{
                        this.projectHasChanged.emit({create: false, delete: false, update: true,id: dat.id});
                        return res();
                    });               
                }
            }).catch((reason)=>{
                return rej(reason);
            });
        });
    }
    addPicture(picture, proj?){
        return new Promise((res, rej)=>{
            this.getProject(proj).then((data)=>{
                let dat = (data as {id: string, selected: boolean, name: string, colors: Array<Object>, pictures: Array<string>});
                dat.pictures.push(picture);
                this.storage.set(dat.id, dat).then(()=>{
                    this.projectHasChanged.emit({create: false, delete: false, update: true,id: dat.id});
                    return res();        
                }).catch((reason)=>{
                    return rej(reason);
                })
            }).catch((reason)=>{
                return rej(reason);
            });
        });
    }
    
    removeColor(color, proj?){
        if(typeof color == "string"){
            color = this.clrSrv.getColor(color);
        }
        return new Promise((res, rej)=>{
            this.getProject(proj).then((data)=>{
                let dat = (data as {id: string, selected: boolean, name: string, colors: Array<any>, pictures: Array<string>});
                let index = dat.colors.findIndex((el)=>{
                    return el.number == color.number;
                });
                if(index>-1){
                   dat.colors.splice(index, 1);
                    this.storage.set(dat.id, dat).then(()=>{
                        this.projectHasChanged.emit({create: false, delete: false, update: true,id: dat.id});
                        return res();        
                    }).catch((reason)=>{
                        return rej(reason);
                    })
                } else {
                    return rej("Color not found: "+color.number+" in "+dat.id);
                }
            }).catch((reason)=>{
                return rej(reason);
            });
        });
    }
    removePicture(picture, proj?){
        return new Promise((res, rej)=>{
            this.getProject(proj).then((data)=>{
                let dat = (data as {id: string, selected: boolean, name: string, colors: Array<any>, pictures: Array<string>});
                let index = dat.pictures.findIndex((el)=>{
                    return el == picture;
                });
                if(index>-1){
                    dat.pictures.splice(index, 1);
                    this.storage.set(dat.id, dat).then(()=>{
                        this.projectHasChanged.emit({create: false, delete: false, update: true,id: dat.id});
                        return res();        
                    }).catch((reason)=>{
                        return rej(reason);
                    })
                } else {
                    return rej("Picture not found: "+picture+" in "+dat.id);
                }
            }).catch((reason)=>{
                return rej(reason);
            });
        });
    }
    removeProject(id?){
        return new Promise((res, rej)=>{
            let ID;
            if(typeof id == "string"){
                ID = id;
            } else if(id.id != null) {
                ID = id.id;
            } else if(typeof id == null){
                this.getProjects().then((data)=>{
                  let proj = (data as Array<{id: string, selected: boolean, name: string, colors: Array<Object>, pictures: Array<string>}>).find((obj)=>{
                      return obj.selected         
                  });
                    if(proj != undefined){
                        this.storage.remove(proj.id).then(()=>{
                            this.selectProject().then(()=>{
                                this.projectHasChanged.emit({create: false, delete: true, update: false,id: proj.id});
                                return res();
                            })
                          });
                    } else {
                        return rej("Cannot locate selected project");
                    }  
                });      
            } else {
                return rej("Invalid type: " + id+ " or " + id.id + " Expected String or Project Object" );
            }
            this.getProjects().then((data)=>{
                let proj = (data as Array<{id: string, selected: boolean, name: string, colors: Array<Object>, pictures: Array<string>}>).find((obj)=>{
                    return obj.id == ID;
                });
                if(proj != undefined){
                    this.storage.remove(proj.id).then(()=>{
                        if(proj.selected){
                            this.selectProject().then(()=>{
                                this.projectHasChanged.emit({create: false, delete: true, update: false,id: proj.id});
                                 return res();
                            });
                        } else {
                             this.projectHasChanged.emit({create: false, delete: true, update: false,id: proj.id});
                             return res();
                        }
                    });
                } else {
                    return rej("No project found for ID: "+ID);
                }               
            });
        });
    }
    
    createProject(name, size?, pictures?, colors?){
        return new Promise((res, rej) => {
           let project = {
               id: "",
               name: "",
               size: size || 0,
               selected: false,
               pictures: [],
               colors: [],
           }
            let id = this.prefix + (++this.numberOfProjects);
            if(name != undefined){
                project.name = name;
            } else {
                console.error("Cannot Create Nameless Project");
                return rej("Cannot create nameless project");
            }
            if(pictures != undefined && pictures != null){
                if(typeof pictures == "string"){
                    project.pictures = [pictures];
                } else {
                    project.pictures = pictures;
                }
            } else {
                project.pictures = [];
            }
            if(colors != undefined && colors != null){
                if(typeof colors == "string"){
                    project.colors = [this.clrSrv.getColor(colors)];
                } else if(colors.hasOwnProperty('number')){
                     project.colors = [this.clrSrv.getColor(colors.number)];      
                }else{
                    project.colors = colors;
                }
            } else {
                project.colors = [];
            }
            project.id= id;
            this.storage.set(id, project).then(()=>{
                this.selectProject(id).then((status)=>{
                    console.log(status); 
                    this.projectHasChanged.emit({create: true, delete: false, update: false,id: id});
                    return res(project);                       
                }).catch((reason)=>{
                    console.log(reason);
                    return rej(reason);
                });      
            });
        });     
    }
    
}