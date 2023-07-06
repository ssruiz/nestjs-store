import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/db/db.service';
import { Prisma, Product, User } from '@prisma/client';
import { PaginationDto } from 'src/commons/dto/pagination.dto';
import { ProductList } from './interfaces/product-list.interface';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto, user: User) {
    const slug =
      createProductDto.slug?.replace(' ', '_') ||
      createProductDto.title.toLowerCase().replace(' ', '_');

    const { images = [], ...productoBody } = createProductDto;
    try {
      const newProduct: Product = await this.prisma.product.create({
        data: {
          ...productoBody,
          userId: user.id,
          slug,
          images: {
            createMany: {
              data: images.map((img) => ({
                url: img,
              })),
            },
          },
        },
      });
      return newProduct;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2002') {
          throw new BadRequestException(
            `There is a unique constraint violation, a new producto cannot be created with title='${createProductDto.title}' and slug='${createProductDto.slug}'`,
          );
        }
      }
      throw error;
    }
  }

  async findAll({ limit, offset }: PaginationDto) {
    const products: ProductList[] = await this.prisma.product.findMany({
      take: limit,
      skip: offset,
      include: {
        images: true,
      },
    });

    return products.map((p) => ({
      ...p,
      images: p.images.map((img) => img.url),
    }));
  }

  async findOne(term: string) {
    const id_ = parseInt(term, 10);
    let product;
    if (id_)
      product = await this.prisma.product.findUnique({
        where: {
          id: id_,
        },
        include: {
          images: true,
        },
      });
    else
      product = await this.prisma.product.findFirst({
        where: {
          slug: term,
        },
      });

    if (!product) throw new NotFoundException(`Product not found`);

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto, user: User) {
    const slug =
      updateProductDto.slug?.replace(' ', '_') ||
      updateProductDto.title?.toLowerCase().replace(' ', '_');
    const { images = [], ...productoBody } = updateProductDto;
    try {
      let newProduct = await this.prisma.product.update({
        where: {
          id,
        },
        include: {
          images: true,
        },
        data: {
          ...productoBody,
          userId: user.id,
          slug,
        },
      });

      if (images.length > 0) {
        newProduct = await this.prisma.product.update({
          where: { id },
          include: {
            images: true,
          },
          data: {
            images: {
              deleteMany: {
                productId: id,
              },
              createMany: {
                data: images.map((img) => ({
                  url: img,
                })),
              },
            },
          },
        });
      }

      return newProduct;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2002') {
          throw new BadRequestException(
            `There is a unique constraint violation, a new product cannot be created with name '${updateProductDto.title}'`,
          );
        }
        if (error.code === 'P2025') {
          throw new NotFoundException(`Not found pokemon with id: '${id}'`);
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const newPokemon = await this.prisma.product.delete({
        where: {
          id,
        },
      });

      return newPokemon;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner

        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Product not found pokemon with id: '${id}'`,
          );
        }
      }
      throw error;
    }
  }
}
