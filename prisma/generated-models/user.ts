import { Product } from './product';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiPropertyOptional({ type: String })
  fullname?: string;

  @ApiProperty({ type: Boolean })
  isActive = true;

  @ApiProperty({ isArray: true, type: String })
  roles: string[] = ['user'];

  @ApiProperty({ isArray: true, type: () => Product })
  products: Product[];
}
