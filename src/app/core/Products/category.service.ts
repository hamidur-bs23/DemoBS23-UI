import { Injectable } from "@angular/core";

@Injectable()
export class CategoryService {
    constructor(){

    }

    getByid(id: number){
        console.log("You've getting " + id);
    }
}