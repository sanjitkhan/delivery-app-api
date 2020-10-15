import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProductDto } from './product.dto';
import { Product } from './product.model';
import { ProductsService } from './product.service';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({
    summary: 'post',
    description: 'Add a product',
  })
  async create(@Body() product: ProductDto): Promise<Product> {
    return await this.productsService.createProduct(product);
  }

  @Get()
  @ApiOperation({
    summary: 'get',
    description: 'Fetch all products',
  })
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAllProducts();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get',
    description: 'Fetch product by id',
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  async find(@Param() params): Promise<Product> {
    return this.productsService.findProductById(params.id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete',
    description: 'Delete product by id',
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  async removeOne(@Param() params): Promise<{ n?: number, ok?: number }> {
    return this.productsService.deleteOneProductById(params.id);
  }

  @Delete()
  @ApiOperation({
    summary: 'delete',
    description: 'Delete many products by ids',
  })
  async removeMany(@Body() ids: string[]): Promise<{ n?: number, ok?: number }> {
    return this.productsService.deleteManyProductsByIds(ids);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'update',
    description: 'Update some properties of a product by id',
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  async updateSomeProperties(@Param() params, @Body() product: Partial<ProductDto>): Promise<Product> {
    return this.productsService.updatePartialProductById(params.id, product);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'update',
    description: 'Update all properties of a product by id',
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  async updateAllProperties(@Param() params, @Body() product: ProductDto): Promise<Product> {
    return await this.productsService.updateWholeProductById(params.id, product);
  }
}
