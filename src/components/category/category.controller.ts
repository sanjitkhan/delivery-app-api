import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from './category.dto';
import { Category } from './category.model';
import { CategoryService } from './category.service';

@Controller('categories')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({
    summary: 'post',
    description: 'Add a category',
  })
  async create(@Body() category: CategoryDto): Promise<Category> {
    return await this.categoryService.createCategory(category);
  }

  @Get()
  @ApiOperation({
    summary: 'get',
    description: 'Fetch all categories',
  })
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAllCategories();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get',
    description: 'Fetch category by id',
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  async find(@Param() params): Promise<Category> {
    return this.categoryService.findCategoryById(params.id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete',
    description: 'Delete category by id',
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  async removeOne(@Param() params): Promise<{ n?: number, ok?: number }> {
    return this.categoryService.deleteOneCategoryById(params.id);
  }

  @Delete()
  @ApiOperation({
    summary: 'delete',
    description: 'Delete many categories by ids',
  })
  async removeMany(@Body() ids: string[]): Promise<{ n?: number, ok?: number }> {
    return this.categoryService.deleteManyCategoriesByIds(ids);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'update',
    description: 'Update some properties of a category by id',
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  async updateSomeProperties(@Param() params, @Body() category: Partial<CategoryDto>): Promise<Category> {
    return this.categoryService.updatePartialCategoryById(params.id, category);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'update',
    description: 'Update all properties of a category by id',
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  async updateAllProperties(@Param() params, @Body() category: CategoryDto): Promise<Category> {
    return await this.categoryService.updateWholeCategoryById(params.id, category);
  }
}
