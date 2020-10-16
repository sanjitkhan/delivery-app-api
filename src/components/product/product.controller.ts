import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProductDto } from './product.dto';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Controller('products')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({
    summary: 'post',
    description: 'Add a product',
  })
  async create(@Body() product: ProductDto): Promise<Product> {
    return await this.productService.createProduct(product);
  }

  @Get()
  @ApiOperation({
    summary: 'get',
    description: 'Fetch all products',
  })
  async findAll(): Promise<Product[]> {
    return await this.productService.findAllProducts();
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
    return this.productService.findProductById(params.id);
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
    return this.productService.deleteOneProductById(params.id);
  }

  @Delete()
  @ApiOperation({
    summary: 'delete',
    description: 'Delete many products by ids',
  })
  async removeMany(@Body() ids: string[]): Promise<{ n?: number, ok?: number }> {
    return this.productService.deleteManyProductsByIds(ids);
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
    return this.productService.updatePartialProductById(params.id, product);
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
    return await this.productService.updateWholeProductById(params.id, product);
  }
}
