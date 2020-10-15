import { Logger } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose/lib/types';
import { FilterQuery } from 'mongoose';

export abstract class CrudService<ComponentModel, ComponentDto> {
  protected constructor(private readonly model: ReturnModelType<any>) {}

  async find(condition: FilterQuery<Document>): Promise<ComponentModel> {
    return this.model.findOne(condition).exec();
  }

  async findAll(): Promise<ComponentModel[]> {
    return this.model.find().exec();
  }

  async create(component: ComponentDto) {
    try {
      return this.model.create(component);
    } catch (e) {
      Logger.error("Unable to create product");
      Logger.debug(e);
    }
  }

  async removeOne(condition: FilterQuery<Document>): Promise<{ n?: number; ok?: number}> {
    try {
      return this.model.deleteOne(condition);
    } catch (e) {
      Logger.error("Unable to delete product");
      Logger.debug(e);
      return {
        n: 0,
        ok: 0
      }
    }
  }

  async removeMany(condition: FilterQuery<Document>): Promise<{ n?: number; ok?: number}> {
    try {
      return this.model.deleteMany(condition);
    } catch (e) {
      Logger.error("Unable to delete some products");
      Logger.debug(e);
      return {
        n: 0,
        ok: 0
      }
    }
  }

  async removeAll(): Promise<{ n?: number; ok?: number}> {
    try {
      return this.model.remove({});
    } catch (e) {
      Logger.error("Unable to delete all products");
      Logger.debug(e);
      return {
        n: 0,
        ok: 0
      }
    }
  }

  async updateSomeProperties(condition: FilterQuery<Document>, product: Partial<ComponentDto>): Promise<ComponentModel> {
    try {
      return this.model.findOneAndUpdate(condition, product, { useFindAndModify: false, new: true });
    } catch (e) {
      Logger.error("Unable to update product");
      Logger.debug(e);
    }
  }

  async updateAllProperties(condition: FilterQuery<Document>, product: ComponentDto): Promise<ComponentModel> {
    try {
      return await this.model.findOneAndUpdate(condition, product, { useFindAndModify: false, overwrite: true, new: true });
    } catch (e) {
      Logger.error("Unable to update product");
      Logger.debug(e);
    }
  }
}
