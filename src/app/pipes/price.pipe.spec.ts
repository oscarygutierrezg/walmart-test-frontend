import { PricePipe } from './price.pipe';
import { Product } from '../model/product';
import { DiscountInfo } from '../model/discount-info';

describe('PricePipe', () => {
  it('create an instance', () => {
    const pipe = new PricePipe();
    expect(pipe).toBeTruthy();
  });
  it('should return the name of the card without the word Tarjeta', () => {

    const  p: Product = new Product();
    const  d: DiscountInfo = new DiscountInfo();
    d.originalPrice = '$300.000';

    p.id = 2737;
    p.brand = 'cnusñwxho';
    p.description = 'oftetv sxgwl';
    p.image = 'www.lider.cl/catalogo/images/bedRoomIcon.svg';
    p.price = 609455;
    p.originalPrice = '$609.455';
    const pipe = new PricePipe();
    const result = pipe.transform(p);
    expect(result).toEqual(p.originalPrice);
  });
  it('should return the name of the card without the word Tarjeta', () => {

    const  p: Product = new Product();
    const  d: DiscountInfo = new DiscountInfo();
    d.originalPrice = '$300.000';
    p.id = 2737;
    p.brand = 'cnusñwxho';
    p.description = 'oftetv sxgwl';
    p.image = 'www.lider.cl/catalogo/images/bedRoomIcon.svg';
    p.price = 609455;
    p.originalPrice = '$609.455';
    p.discountInfo = d;
    const pipe = new PricePipe();
    const result = pipe.transform(p);
    expect(result).toEqual(d.originalPrice);
  });

});
