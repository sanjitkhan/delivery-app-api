import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { BrandDto } from './brand.dto';
import { Brand } from './brand.model';
import { BrandService } from './brand.service';

@Controller('brands')
@ApiTags('Brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @ApiOperation({
    summary: 'post',
    description: 'Add a brand',
  })
  async create(@Body() brand: BrandDto): Promise<Brand> {
    return await this.brandService.createBrand(brand);
  }

  @Get()
  @ApiOperation({
    summary: 'get',
    description: 'Fetch all brands',
  })
  async findAll(): Promise<Brand[]> {
    return await this.brandService.findAllBrands();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get',
    description: 'Fetch brand by id',
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  async find(@Param() params): Promise<Brand> {
    return this.brandService.findBrandById(params.id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete',
    description: 'Delete brand by id',
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  async removeOne(@Param() params): Promise<{ n?: number, ok?: number }> {
    return this.brandService.deleteOneBrandById(params.id);
  }

  @Delete()
  @ApiOperation({
    summary: 'delete',
    description: 'Delete many brands by ids',
  })
  async removeMany(@Body() ids: string[]): Promise<{ n?: number, ok?: number }> {
    return this.brandService.deleteManyBrandsByIds(ids);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'update',
    description: 'Update some properties of a brand by id',
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  async updateSomeProperties(@Param() params, @Body() brand: Partial<BrandDto>): Promise<Brand> {
    return this.brandService.updatePartialBrandById(params.id, brand);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'update',
    description: 'Update all properties of a brand by id',
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  async updateAllProperties(@Param() params, @Body() brand: BrandDto): Promise<Brand> {
    return await this.brandService.updateWholeBrandById(params.id, brand);
  }
}
