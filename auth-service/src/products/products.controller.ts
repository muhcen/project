import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Inject,
  Param,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.gurds';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, of, throwError } from 'rxjs';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  @Post()
  async create(@Body() createProductDto) {
    try {
      const a = await this.client
        .send('createProduct', createProductDto)
        .toPromise();

      return a;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Get()
  async findAll() {
    const result = await this.client.send('findAllProducts', '1').toPromise();
    return result;
  }
}
