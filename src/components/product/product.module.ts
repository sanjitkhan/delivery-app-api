import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductController } from './product.controller';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { schemaOptions } from '../../config';

@Module({
  imports: [TypegooseModule.forFeature([{ typegooseClass: Product, schemaOptions }])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}