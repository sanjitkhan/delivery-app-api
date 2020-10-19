import { getModelForClass } from '@typegoose/typegoose';
import { mockBrand } from '../mocks/brand';
import { BrandController } from '../../src/components/brand/brand.controller';
import { Brand } from '../../src/components/brand/brand.model';
import { BrandService } from '../../src/components/brand/brand.service';

describe('BrandController', () => {
  let brandController: BrandController;
  let brandService: BrandService;
  let brandModel;

  beforeEach(() => {
    brandModel = getModelForClass(Brand);
    brandService = new BrandService(brandModel);
    brandController = new BrandController(brandService);
  });

  it('should test findAll method of brand service', async () => {
    const result = [mockBrand];
    jest.spyOn(brandService, 'findAll').mockImplementation(() => Promise.resolve([mockBrand]));
    expect(await brandController.findAll()).toStrictEqual(result);
  });
  it('should test find method of brand service', async () => {
    const result = mockBrand;
    jest.spyOn(brandService, 'find').mockImplementation(() => Promise.resolve(mockBrand));
    expect(await brandController.find("1")).toStrictEqual(result);
  });
  it('should test create method of brand service', async () => {
    const result = mockBrand;
    jest.spyOn(brandService, 'create').mockImplementation(() => Promise.resolve(mockBrand));
    expect(await brandController.create(mockBrand)).toStrictEqual(result);
  });
  it('should test removeOne method of brand service', async () => {
    const result = {
      n: 1,
      ok: 1
    };
    jest.spyOn(brandService, 'removeOne').mockImplementation(() => Promise.resolve(result));
    expect(await brandController.removeOne("1")).toStrictEqual(result);
  });
  it('should test removeMany method of brand service', async () => {
    const result = {
      n: 1,
      ok: 1
    };
    jest.spyOn(brandService, 'removeMany').mockImplementation(() => Promise.resolve(result));
    expect(await brandController.removeMany(["1","2"])).toStrictEqual(result);
  });
  it('should test updateSomeProperties method of brand service', async () => {
    const result = mockBrand;
    jest.spyOn(brandService, 'updateSomeProperties').mockImplementation(() => Promise.resolve(mockBrand));
    expect(await brandController.updateSomeProperties("1", mockBrand)).toStrictEqual(result);
  });
  it('should test updateAllProperties method of brand service', async () => {
    const result = mockBrand;
    jest.spyOn(brandService, 'updateAllProperties').mockImplementation(() => Promise.resolve(mockBrand));
    expect(await brandController.updateAllProperties("1", mockBrand)).toStrictEqual(result);
  });
});
