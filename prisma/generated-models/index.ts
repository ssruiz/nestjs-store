import { Product as _Product } from './product';
import { ProductImages as _ProductImages } from './product_images';
import { User as _User } from './user';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace PrismaModel {
  export class Product extends _Product {}
  export class ProductImages extends _ProductImages {}
  export class User extends _User {}

  export const extraModels = [Product, ProductImages, User];
}
