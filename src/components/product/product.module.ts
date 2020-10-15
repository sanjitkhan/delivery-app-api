import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductsController } from './product.controller';
import { Product } from './product.model';
import { ProductsService } from './product.service';
import { schemaOptions } from '../../config';

@Module({
  imports: [TypegooseModule.forFeature([{ typegooseClass: Product, schemaOptions }])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}