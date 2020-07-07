
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PageResponse } from '../model/page-response';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private _productUrl = '/product';
    productChangeObs = new Subject < PageResponse > ();


    constructor(
        private http: HttpClient
    ) {}

    findByText(text: string, page: number, size: number): Observable < PageResponse > {
        return this.http.post < PageResponse > (`${environment.api}${this._productUrl}/findByText`, {
                text,
                page,
                size
            }, httpOptions)
            .pipe(
                tap(_ => {
                    this.productChangeObs.next(_);
                    this.log('fetched Product');
                }),
                catchError(this.handleError < PageResponse > ('findByText', new PageResponse()))
            );
    }

    findById(id: number): Observable < PageResponse > {
        return this.http.get < PageResponse > (`${environment.api}${this._productUrl}/${id}`)
            .pipe(
                tap(_ => {
                    this.productChangeObs.next(_);
                    this.log('fetched Product');
                }),
                catchError(this.handleError < PageResponse > ('findById', new PageResponse()))
            );
    }


    private handleError < T > (operation = 'operation', result ? : T) {
        return (error: any): Observable < T > => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    private log(message: string) {
        console.log(message);
    }


    public get productUrl(): string {
      return this._productUrl;
  }
}
