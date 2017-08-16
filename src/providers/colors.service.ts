import { Injectable } from '@angular/core';
import * as data from '../assets/data/shrinkColor.json';

@Injectable()

export class ColorsService {
    
    
    constructor() {
        
    }
    getAllColors(filter?){
        let colors = []
        for(let family in data){
            for(let col in data[family]){
                let colorr = data[family][col];
                delete colorr.component;
                delete colorr.opts;
                colors.push(colorr);
            }
        }
        if(typeof filter != 'undefined' || filter != null){
           colors = colors.filter(color=>{
                return (color.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) || (color.number.toLowerCase().indexOf(filter.toLowerCase()) > -1);
            })
        }
        return colors;
    }
    getColor(color) {
        for(let family in data){
            for(let col in data[family]){
                if(data[family][col].number == color){
                   let colorr = data[family][col];
                    delete colorr.component;
                    delete colorr.opts;
                    return colorr;
                }
            }
        } 
        return null;
    }
    getFamily(family){
        return data[this.capitalize(family)];
    }
    capitalize(string) {
     return string.charAt(0).toUpperCase() + string.slice(1);
    }
}