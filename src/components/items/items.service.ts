import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemDto } from './items.dto';
import { Item } from './items.schema';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private readonly itemModel: Model<Item>) {}

  async find(id: string): Promise<Item> {
    const item = await this.itemModel.findById(id).exec();
    return item;
  }

  async findAll(): Promise<Item[]> {
    const items = await this.itemModel.find().exec();
    return items;
  }

  async create(item: ItemDto): Promise<Item> {
    const createdItem = new this.itemModel(item);
    return createdItem.save();
  }
}
