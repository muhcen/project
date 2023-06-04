import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private ProductsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = new Product();
    const { name, description, year, model } = createProductDto;
    product.name = name;
    product.description = description;
    product.model = model;
    product.year = year;
    await this.ProductsRepository.save(product);
    return product;
  }

  findAll() {
    return this.ProductsRepository.find({});
  }
}
