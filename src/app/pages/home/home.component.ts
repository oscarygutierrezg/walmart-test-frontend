import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { PageResponse } from 'src/app/model/page-response';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    private _page = 1;
    private _pageSize = 3;
    public textValue;
    private productChangeObs: Subscription;
    private _pageResponse: PageResponse;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productChangeObs = this.productService.productChangeObs.subscribe((j: PageResponse) => {
            if (j !== null) {
                this.pageResponse = j;
            }
        });
    }

    ngOnDestroy(): void {
        this.productChangeObs.unsubscribe();
    }

    findProducts(text) {
        this.textValue = text;
        if (isNaN(+text)) {
            this.findByText(text);
        } else {
            this.findById(+text);
        }

    }

    findByText(text: string) {
        this.productService.findByText(text, this.page - 1, this.pageSize).subscribe();
    }

    findById(id: number) {
        this.productService.findById(id).subscribe();
    }

    public onPageChange(): void {
        this.findProducts(this.textValue);
    }

    public get pageResponse(): PageResponse {
        return this._pageResponse;
    }
    public set pageResponse(value: PageResponse) {
        this._pageResponse = value;
    }


    public get page(): number {
        return this._page;
    }
    public set page(value: number) {
        this._page = value;
    }


    public get pageSize(): number {
        return this._pageSize;
    }
    public set pageSize(value: number) {
        this._pageSize = value;
    }

}
