import { Injectable } from "@angular/core";
import { DataService } from "./data.service";

import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { IProduct } from "../models/product.model";

@Injectable()
export class ProductService extends DataService {

    private urlGetAll = environment.appBaseUrl + "/product/getall";

    getAllProducts(){
        return super.getAll(this.urlGetAll);
    }
}