import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CrudService } from '../crud/crud.service';
import { CategoryDto } from './category.dto';
import { Category } from './category.model';

@Injectable()
export class CategoryService extends CrudService<Category, CategoryDto> {
  constructor(
    @InjectModel(Category) model: ReturnModelType<typeof Category>
  ) {
    super(model);
  }

  async findCategoryById(id: string): Promise<Category> {
    return this.find({ _id: id });
  }

  async findAllCategories(): Promise<Category[]> {
    return this.findAll();
  }

  async createCategory(category: CategoryDto): Promise<Category> {
    return this.create(category);
  }

  async deleteOneCategoryById(id: string): Promise<{ n?: number; ok?: number}> {
    return this.removeOne({ _id: id });
  }

  async deleteManyCategoriesByIds(ids: string[]): Promise<{ n?: number; ok?: number}> {
    return this.removeMany({ _id: { $in: ids } });
  }

  async deleteAllCategories(): Promise<{ n?: number; ok?: number}> {
    return this.removeAll();
  }

  async updatePartialCategoryById(id: string, category: Partial<CategoryDto>): Promise<Category> {
    return this.updateSomeProperties({ _id: id }, category);
  }

  async updateWholeCategoryById(id: string, category: CategoryDto): Promise<Category> {
    return await this.updateAllProperties({ _id: id }, category);
  }
}
