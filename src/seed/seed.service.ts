import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { initialData } from './data/product.data';
import { PrismaService } from 'src/db/db.service';
import { hash } from 'argon2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductService,
    private readonly config: ConfigService,
  ) {}

  async seed() {
    const count = await this.prisma.product.count();

    if (count > 0) return { message: 'DB already populated' };

    const password = await hash(this.config.get<string>('ADMIN_PASSWORD'));

    const user_admin = await this.prisma.user.create({
      data: {
        email: 'admin@admin.com',
        password,
        fullname: 'admin',
        roles: ['admin', 'super-admin'],
      },
    });

    const products = initialData.products;

    await Promise.all(
      products.map((p) => {
        if (!p.title) console.log('first', p.description);
        return this.productService.create(p, user_admin);
      }),
    );
    return { message: 'DB populated!' };
  }
}
