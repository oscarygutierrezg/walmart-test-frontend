import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: Product): string {
    if (value.discountInfo) {
      return value.discountInfo.originalPrice;
    }
    return value.originalPrice;
  }

}
