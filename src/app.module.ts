import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductModule } from './components/product/product.module';
import { config } from './config';

@Module({
  imports: [
    TypegooseModule.forRoot(config.mongodbUrl, { useNewUrlParser: true }),
    ProductModule
  ],
})

export class AppModule {}
