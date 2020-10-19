import { getModelForClass } from '@typegoose/typegoose';
import { mockProduct } from '../mocks/product';
import { ProductController } from '../../src/components/product/product.controller';
import { Product } from '../../src/components/product/product.model';
import { ProductService } from '../../src/components/product/product.service';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;
  let productModel;

  beforeEach(() => {
    productModel = getModelForClass(Product);
    productService = new ProductService(productModel);
    productController = new ProductController(productService);
  });

  it('should test findAll method of product service', async () => {
    const result = [mockProduct];
    jest.spyOn(productService, 'findAll').mockImplementation(() => Promise.resolve([mockProduct]));
    expect(await productController.findAll()).toStrictEqual(result);
  });
  it('should test find method of product service', async () => {
    const result = mockProduct;
    jest.spyOn(productService, 'find').mockImplementation(() => Promise.resolve(mockProduct));
    expect(await productController.find("1")).toStrictEqual(result);
  });
  it('should test create method of product service', async () => {
    const result = mockProduct;
    jest.spyOn(productService, 'create').mockImplementation(() => Promise.resolve(mockProduct));
    expect(await productController.create(mockProduct)).toStrictEqual(result);
  });
  it('should test removeOne method of product service', async () => {
    const result = {
      n: 1,
      ok: 1
    };
    jest.spyOn(productService, 'removeOne').mockImplementation(() => Promise.resolve(result));
    expect(await productController.removeOne("1")).toStrictEqual(result);
  });
  it('should test removeMany method of product service', async () => {
    const result = {
      n: 1,
      ok: 1
    };
    jest.spyOn(productService, 'removeMany').mockImplementation(() => Promise.resolve(result));
    expect(await productController.removeMany(["1","2"])).toStrictEqual(result);
  });
  it('should test updateSomeProperties method of product service', async () => {
    const result = mockProduct;
    jest.spyOn(productService, 'updateSomeProperties').mockImplementation(() => Promise.resolve(mockProduct));
    expect(await productController.updateSomeProperties("1", mockProduct)).toStrictEqual(result);
  });
  it('should test updateAllProperties method of product service', async () => {
    const result = mockProduct;
    jest.spyOn(productService, 'updateAllProperties').mockImplementation(() => Promise.resolve(mockProduct));
    expect(await productController.updateAllProperties("1", mockProduct)).toStrictEqual(result);
  });
});
