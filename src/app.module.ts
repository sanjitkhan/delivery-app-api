import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BrandModule } from './components/brand/brand.module';
import { CategoryModule } from './components/category/category.module';
import { ProductModule } from './components/product/product.module';
import { config } from './config';

@Module({
  imports: [
    TypegooseModule.forRoot(config.mongodbUrl, { useNewUrlParser: true }),
    ProductModule,
    BrandModule,
    CategoryModule
  ],
})

export class AppModule {}
