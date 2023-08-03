import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProductDto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async create(createProducctDto: CreateProductDto): Promise<Product> {
    return this.productRepository.save(createProducctDto);
  }

  async get(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async update(id: number, { title, image, likes }): Promise<any> {
    return this.productRepository.update(id, { title, image, likes });
  }

  async likes(id: number, { likes }): Promise<any> {
    return this.productRepository.update(id, { likes });
  }

  async delete(id: number): Promise<any> {
    return this.productRepository.delete(id);
  }
}
