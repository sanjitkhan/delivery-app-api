import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BrandController } from './brand.controller';
import { Brand } from './brand.model';
import { BrandService } from './brand.service';
import { schemaOptions } from '../../config';

@Module({
  imports: [TypegooseModule.forFeature([{ typegooseClass: Brand, schemaOptions }])],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}