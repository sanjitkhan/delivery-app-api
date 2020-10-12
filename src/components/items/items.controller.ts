import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ItemDto } from './items.dto';
import { Item } from './items.schema';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(@Body() item: ItemDto): Promise<Item> {
    const createdItem = await this.itemsService.create(item);
    return createdItem;
  }

  @Get()
  async findAll(): Promise<Item[]> {
    const items = await this.itemsService.findAll();
    return items;
  }

  @Get(':id')
  async find(@Param() params): Promise<Item> {
    console.log('need item #', params.id);
    const item = this.itemsService.find(params.id);
    return item;
  }
}
