import { Sort } from './sort';
import { Product } from './product';
import { Pageable } from './pageable';

export interface PageResponse {
  content: Product[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  sort: Sort;
  empty: boolean;
}