import { getModelForClass } from '@typegoose/typegoose';
import { Product } from '../../src/components/product/product.model';
import app from './e2e-framework';
import { Response } from 'supertest';
import { ProductService } from '../../src/components/product/product.service';
import { mockProduct } from '../mocks/product';

const path = '/products';

describe('Products', () => {
  let productModel;
  let productService: ProductService;
  let productWithId: Product = mockProduct; // id will be added after 2nd test case where we add a product
  let pathToProduct = '';

  beforeAll(async () => {
    await app.init();
    productModel = getModelForClass(Product);
    productService = new ProductService(productModel);
  });

  afterAll(async () => {
    await app.close();
    await productModel.remove({});
  });

  it(`should delete all products`, async () => {
    const res = await productService.deleteAllProducts();
    expect(res.ok).toBe(1);
  });

  it(`should add a product`, async () => {
    const res: Response = await app.post({
      path,
      body: mockProduct
    });

    productWithId = {
      ...productWithId,
      id: res.body.id
    };
    pathToProduct = path + "/" + productWithId.id;

    expect(res.status).toBe(201);
    expect(res.body).toStrictEqual(productWithId);
  });

  it(`should get all products`, async () => {
    const res: Response = await app.get({
      path
    });

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual([productWithId]);
  });
  it(`should get a single product`, async () => {
    const res: Response = await app.get({
      path: pathToProduct,
    });

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(productWithId);
  });

  it(`should update a property of a product`, async () => {
    const res: Response = await app.patch({
      path: pathToProduct,
      body: {
        name: "new name"
      }
    });

    // edit the name in the expected data
    productWithId = {
      ...productWithId,
      name: "new name"
    };

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(productWithId);
  });

  it(`should update the entire product`, async () => {
    delete productWithId["categories"];
    const res: Response = await app.put({
      path: pathToProduct,
      body: productWithId
    });
    productWithId = {
      ...productWithId,
      categories: []
    }
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(productWithId);
  });

  it(`should delete a product`, async () => {
    const res: Response = await app.delete({
      path: pathToProduct
    });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(1);
  });

  it(`should delete multiple products`, async () => {
    // adding 2 products
    let res: Response = await app.post({
      path,
      body: mockProduct
    });
    const productWithId1 = res.body;
    res = await app.post({
      path,
      body: mockProduct
    });
    const productWithId2 = res.body;

    // verifying there are 2 products
    res = await app.get({
      path
    });
    expect(res.body).toStrictEqual([productWithId1, productWithId2]);

    // deleting both products
    res = await app.delete({
      path,
      body: [productWithId1.id, productWithId2.id]
    })
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(1);
    expect(res.body.deletedCount).toBe(2);

    // verifying there are 0 products
    res = await app.get({
      path
    });
    expect(res.body).toStrictEqual([]);
  });

  afterAll(async () => {
    await app.close();
  });
});