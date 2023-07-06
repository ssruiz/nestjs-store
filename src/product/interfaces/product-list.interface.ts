import { Product, ProductImages } from '@prisma/client';

export type ProductList = Product & {
  images: ProductImages[];
};
