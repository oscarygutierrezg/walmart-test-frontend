import { DiscountInfo } from './discount-info';

export class Product {

  constructor() {
    this.id = 0;
    this.brand =' ';
    this.description = ' ';
    this.image = ' ';
    this.originalPrice = ' ';
    this.price = 0;
  }

  id: number;
  brand: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: string;
  discountInfo?: DiscountInfo;
}
