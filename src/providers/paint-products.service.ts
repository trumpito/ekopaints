import { Injectable } from '@angular/core';
import * as data from '../assets/data/products.json';

@Injectable()

export class PaintProductsService {
    
    constructor() {}
    
    getProducts() {
        return data.products;
    }
}