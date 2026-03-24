import products1 from './ProductList/products1.json';
import products2 from './ProductList/products2.json';
import products3 from './ProductList/products3.json';
import products4 from './ProductList/products4.json';

export const PRODUCT_ROWS = [
  { list: products1, directionReverse: true },
  { list: products2, directionReverse: false },
  { list: products3, directionReverse: true },
  { list: products4, directionReverse: false },
] as const;
