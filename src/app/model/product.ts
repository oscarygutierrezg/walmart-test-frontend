import { DiscountInfo } from './discount-info';

export class Product {
  id: number;
  brand: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: string;
  discountInfo?: DiscountInfo;
}
