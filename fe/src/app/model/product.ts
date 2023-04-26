import {ProductType} from './product-type';
import {Brand} from './brand';

export interface Product {
  productId?: number;
  productName?: string;
  price?: number;
  descriptions?: string;
  img?: string;
  amount?: number;
  deleteStatus?: boolean;
  productType?: ProductType;
  brand?: Brand;
}
