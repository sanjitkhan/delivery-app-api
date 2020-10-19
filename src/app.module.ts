import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BrandModule } from './components/brand/brand.module';
import { CategoryModule } from './components/category/category.module';
import { ProductModule } from './components/product/product.module';
import { config } from './config';
import { AuthModule } from './components/auth/auth.module';
import { UserModule } from './components/user/user.module';

@Module({
  imports: [
    TypegooseModule.forRoot(config.mongodbUrl, { useNewUrlParser: true }),
    ProductModule,
    BrandModule,
    CategoryModule,
    AuthModule,
    UserModule
  ],
})

export class AppModule {}
