import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProductDto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  async get() {
    return this.productService.all();
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);

    this.client.emit('product_created', product);

    return product;
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.productService.get(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('image') image: string,
  ) {
    const product = await this.productService.update(id, {
      title,
      image,
      likes: 0,
    });

    this.client.emit('product_updated', product);

    return product;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.productService.delete(id);
    this.client.emit('product_deleted', id);
  }

  @Post(':id/like')
  async like(@Param('id') id: number) {
    const product = this.productService.get(id);
    console.log(product);
    // return this.productService.likes(id, { likes: product.likes + 1 });
  }
}
