import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CrudService } from '../crud/crud.service';
import { BrandDto } from './brand.dto';
import { Brand } from './brand.model';

@Injectable()
export class BrandService extends CrudService<Brand, BrandDto> {
  constructor(
    @InjectModel(Brand) model: ReturnModelType<typeof Brand>
  ) {
    super(model);
  }

  async findBrandById(id: string): Promise<Brand> {
    return this.find({ _id: id });
  }

  async findAllBrands(): Promise<Brand[]> {
    return this.findAll();
  }

  async createBrand(brand: BrandDto): Promise<Brand> {
    return this.create(brand);
  }

  async deleteOneBrandById(id: string): Promise<{ n?: number; ok?: number}> {
    return this.removeOne({ _id: id });
  }

  async deleteManyBrandsByIds(ids: string[]): Promise<{ n?: number; ok?: number}> {
    return this.removeMany({ _id: { $in: ids } });
  }

  async deleteAllBrands(): Promise<{ n?: number; ok?: number}> {
    return this.removeAll();
  }

  async updatePartialBrandById(id: string, brand: Partial<BrandDto>): Promise<Brand> {
    return this.updateSomeProperties({ _id: id }, brand);
  }

  async updateWholeBrandById(id: string, brand: BrandDto): Promise<Brand> {
    return await this.updateAllProperties({ _id: id }, brand);
  }
}
