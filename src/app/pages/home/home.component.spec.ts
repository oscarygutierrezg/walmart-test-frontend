import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LegalComponent } from 'src/app/components/legal/legal.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { filter } from 'rxjs/operators';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { ProductComponent } from 'src/app/components/product/product.component';
import { PricePipe } from 'src/app/pipes/price.pipe';
import { Subject, Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { PageResponse } from 'src/app/model/page-response';

const  response = new PageResponse();


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

class MockProductService  {

  productChangeObs = new Subject < PageResponse > ();

  findByText(text: string, page: number, size: number): Observable < PageResponse > {
    this.productChangeObs.next(null);
    return new Observable<PageResponse>();
  }

findById(id: number): Observable < PageResponse > {
  this.productChangeObs.next(response);
  return new Observable<PageResponse>();
}
}
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const serviceMock = new MockProductService();

  beforeEach(async(() => {

    TestBed.overrideProvider(ProductService, { useValue: serviceMock });
    TestBed.configureTestingModule({
      imports: [
        NgbModule,
        HttpClientModule
      ],
      declarations: [ HomeComponent, LegalComponent, HeaderComponent, FilterComponent, ProductComponent, PricePipe ],
      providers: [
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.pageSize = 1;
    component.page = 1;
    fixture.detectChanges();
}));

  it('should create', () => {
     component.pageSize = 1;
     component.page = 1;
     expect(component).toBeTruthy();
  });

  it('should create page', () => {
    component.page = 1;
    expect(component.page).toBe(1);
 });

  it('should create pageSize', () => {
  component.pageSize = 1;
  expect(component.pageSize).toBe(1);
});


  it('should create response', () => {
  component.pageResponse = response;
  expect(component.pageResponse).toBe(response);
});


  it('should create findById', () => {
    const spy = spyOn(component, 'findById');
    component.findProducts('1');
    expect(spy).toHaveBeenCalled();
 });

  it('should create findByText', () => {
  const spy = spyOn(component, 'findByText');
  component.findProducts('www');
  expect(spy).toHaveBeenCalled();
});

  it('should create findProducts', () => {
  const spy = spyOn(component, 'findProducts');
  component.onPageChange();
  expect(spy).toHaveBeenCalled();
});


  it('should create findProducts', () => {
  serviceMock.findById(2);
  expect(component.pageResponse).toBe(response);
});


  it('should create findProducts', () => {
  serviceMock.findByText('', 0, 0);
  expect(component.pageResponse).toBeUndefined();
});


  it('should create findProducts', () => {
  component.findByText('');
  expect(component.pageResponse).toBeUndefined();
});


  it('should create findProducts', () => {
  component.findById(1);
  expect(component.pageResponse).toBe(response);
});


  it('should create findProducts', () => {
  const spy = spyOn(console, 'log');
  component.findById(1);
  expect(spy).toHaveBeenCalled();
});






});
