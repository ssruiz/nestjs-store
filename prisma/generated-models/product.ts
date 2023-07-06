import { ProductImages } from './product_images';
import { User } from './user';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Product {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: Number })
  price: number;

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiProperty({ type: String })
  slug: string;

  @ApiProperty({ type: String })
  type: string;

  @ApiProperty({ type: Number })
  stock: number;

  @ApiProperty({ isArray: true, type: String })
  sizes: string[];

  @ApiProperty({ type: String })
  gender: string;

  @ApiProperty({ isArray: true, type: String })
  tags: string[] = [];

  @ApiProperty({ isArray: true, type: () => ProductImages })
  images: ProductImages[];

  @ApiPropertyOptional({ type: () => User })
  user?: User;

  @ApiPropertyOptional({ type: Number })
  userId?: number;
}
