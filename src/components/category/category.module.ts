import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CategoryController } from './category.controller';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { schemaOptions } from '../../config';

@Module({
  imports: [TypegooseModule.forFeature([{ typegooseClass: Category, schemaOptions }])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}