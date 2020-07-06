import { TestBed, inject, async } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProductService', () => {
    let comp: ProductService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule
            ],
            providers: [ProductService]
        });
        comp = TestBed.get(ProductService);
        httpMock = TestBed.get(HttpTestingController);
    });
    it('should be created', inject([ProductService], (service: ProductService) => {
        expect(service).toBeTruthy();
    }));

    afterEach(() => {
      httpMock.verify();
    });


    it('be able to retrieve pageResponse from the API via GET', inject([ProductService], (service: ProductService) => {

      const mockResponse = {
        content: [{
            id: 2305,
            brand: 'adda',
            description: 'oftetv sxgwl',
            image: 'www.lider.cl/catalogo/images/tvIcon.svg',
            price: 775684,
            discountInfo: {
                percentage: '$50%',
                originalPrice: '$775.684',
                priceWithDiscount: '$387.842'
            }
        }],
        pageable: {
            sort: {
                sorted: false,
                unsorted: true,
                empty: true
            },
            pageNumber: 0,
            pageSize: 3,
            offset: 0,
            paged: true,
            unpaged: false
        },
        last: false,
        totalElements: 9,
        totalPages: 3,
        numberOfElements: 3,
        size: 3,
        number: 0,
        sort: {
            sorted: false,
            unsorted: true,
            empty: true
        },
        first: true,
        empty: false
    };
      comp.findById(2305).subscribe(pageResponse => {
          expect(pageResponse.content.length).toBe(1);
          expect(pageResponse).toEqual(mockResponse);
      });
      const request = httpMock.expectOne( `http://localhost:8080${comp.productUrl}/2305`);
      expect(request.request.method).toBe('GET');
      request.flush(mockResponse);
    }));



    it('be able to retrieve pageResponse from the API via POST', inject([ProductService], (service: ProductService) => {

      const mockResponse = {
        content: [
          {
            id: 2737,
            brand: 'cnusñwxho',
            description: 'oftetv sxgwl',
            image: 'www.lider.cl/catalogo/images/bedRoomIcon.svg',
            price: 609455,
            originalPrice: '$609.455'
        },
        {
            id: 2716,
            brand: 'dcc gdodkñg',
            description: 'oftetv sxgwl',
            image: 'www.lider.cl/catalogo/images/electronicsIcon.svg',
            price: 107308,
            originalPrice: '$107.308'
        },
        {
            id: 2603,
            brand: 'gksxznn',
            description: 'oftetv sxgwl',
            image: 'www.lider.cl/catalogo/images/toysIcon.svg',
            price: 909803,
            originalPrice: '$909.803'
        }
        ],
        pageable: {
            sort: {
                sorted: false,
                unsorted: true,
                empty: true
            },
            pageNumber: 0,
            pageSize: 3,
            offset: 0,
            paged: true,
            unpaged: false
        },
        last: false,
        totalElements: 9,
        totalPages: 3,
        numberOfElements: 3,
        size: 3,
        number: 0,
        sort: {
            sorted: false,
            unsorted: true,
            empty: true
        },
        first: true,
        empty: false
    };
      comp.findByText('oftetv sxgwl', 0, 3).subscribe(pageResponse => {
          expect(pageResponse.content.length).toBe(3);
          expect(pageResponse).toEqual(mockResponse);
      });
      const request = httpMock.expectOne( `http://localhost:8080${comp.productUrl}/findByText`);
      expect(request.request.method).toBe('POST');
      request.flush(mockResponse);
    }));



    it('be able to retrieve pageResponse from the API via POST', inject([ProductService], (service: ProductService) => {

      let response: any;
      let errResponse: any;
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      const data = 'Invalid request parameters';
      comp.findByText('oftetv sxgwl', 0, 10000).subscribe(res => response = res, err => errResponse = err);
      httpMock.expectOne( `http://localhost:8080${comp.productUrl}/findByText`).flush(data, mockErrorResponse);
      expect(errResponse).toBeUndefined();

    }));
});
