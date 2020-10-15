import { Injectable } from '@nestjs/common';
import { getModelForClass, ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CrudService } from '../crud/crud.service';
import { ProductDto } from './product.dto';
import { Product } from './product.model';

@Injectable()
export class ProductService extends CrudService<Product, ProductDto> {
  constructor(
    @InjectModel(Product) model: ReturnModelType<typeof Product>
  ) {
    super(model);
  }

  async findProductById(id: string): Promise<Product> {
    return this.find({ _id: id });
  }

  async findAllProducts(): Promise<Product[]> {
    return this.findAll();
  }

  async createProduct(product: ProductDto): Promise<Product> {
    return this.create(product);
  }

  async deleteOneProductById(id: string): Promise<{ n?: number; ok?: number}> {
    return this.removeOne({ _id: id });
  }

  async deleteManyProductsByIds(ids: string[]): Promise<{ n?: number; ok?: number}> {
    return this.removeMany({ _id: { $in: ids } });
  }

  async deleteAllProducts(): Promise<{ n?: number; ok?: number}> {
    return this.removeAll();
  }

  async updatePartialProductById(id: string, product: Partial<ProductDto>): Promise<Product> {
    return this.updateSomeProperties({ _id: id }, product);
  }

  async updateWholeProductById(id: string, product: ProductDto): Promise<Product> {
    return await this.updateAllProperties({ _id: id }, product);
  }
}
