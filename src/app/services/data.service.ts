import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppError } from '../common/error-exceptions/app-error';
import { BadInputError } from '../common/error-exceptions/bad-input-error';
import { NotFoundError } from '../common/error-exceptions/not-found-error';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) { }

    getAll(url: string) {
        return this.http.get(url)
            .pipe(catchError(this.handleError));
    }

    create(url: string, resource: any) {
        return this.http.post(url, resource)
            .pipe(catchError(this.handleError));
    }

    update(url: string, resource: any) {
        return this.http.put(url + '/' + resource.id, resource)
            .pipe(catchError(this.handleError));
    }

    delete(url: string, id: number) {
        return this.http.delete(url + '/' + id)
            .pipe(catchError(this.handleError));
    }



    private handleError(error: Response) {
        if (error.status === 404)
            return throwError(() => new NotFoundError(error));
        else if (error.status === 400)
            return throwError(() => new BadInputError(error));

        return throwError(() => new AppError(error));
    }

}
