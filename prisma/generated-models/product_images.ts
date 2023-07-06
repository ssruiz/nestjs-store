import { Product } from './product';
import { ApiProperty } from '@nestjs/swagger';

export class ProductImages {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  url: string;

  @ApiProperty({ type: () => Product })
  product: Product;

  @ApiProperty({ type: Number })
  productId: number;
}
