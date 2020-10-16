import { getModelForClass } from '@typegoose/typegoose';
import { Brand } from '../../src/components/brand/brand.model';
import app from './e2e-framework';
import { Response } from 'supertest';
import { BrandService } from '../../src/components/brand/brand.service';
import { mockBrand } from '../mocks/brand';

const path = '/brands';

describe('Brands', () => {
  let brandModel;
  let brandService: BrandService;
  let brandWithId: Brand = mockBrand; // id will be added after the test case where we add a brand
  let pathToBrand = '';

  beforeAll(async () => {
    await app.init();
    brandModel = getModelForClass(Brand);
    brandService = new BrandService(brandModel);
  });

  afterAll(async () => {
    await app.close();
    await brandModel.remove({});
  });

  it(`should delete all brands`, async () => {
    const res = await brandService.deleteAllBrands();
    expect(res.ok).toBe(1);
  });

  it(`should add a brand`, async () => {
    const res: Response = await app.post({
      path,
      body: mockBrand
    });

    brandWithId = {
      ...brandWithId,
      id: res.body.id
    };
    pathToBrand = path + "/" + brandWithId.id;

    expect(res.status).toBe(201);
    expect(res.body).toStrictEqual(brandWithId);
  });

  it(`should get all brands`, async () => {
    const res: Response = await app.get({
      path
    });

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual([brandWithId]);
  });
  it(`should get a single brand`, async () => {
    const res: Response = await app.get({
      path: pathToBrand,
    });

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(brandWithId);
  });

  it(`should update a property of a brand`, async () => {
    const res: Response = await app.patch({
      path: pathToBrand,
      body: {
        name: "new name"
      }
    });

    // edit the name in the expected data
    brandWithId = {
      ...brandWithId,
      name: "new name"
    };

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(brandWithId);
  });

  // TODO: edit after an optional property is added
  it(`should update the entire brand`, async () => {
    brandWithId = {
      ...brandWithId,
      name: "Kwality Walls"
    }    
    const res: Response = await app.put({
      path: pathToBrand,
      body: brandWithId
    });

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(brandWithId);
  });

  it(`should delete a brand`, async () => {
    const res: Response = await app.delete({
      path: pathToBrand
    });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(1);
  });

  it(`should delete multiple brands`, async () => {
    // adding 2 brands
    let res: Response = await app.post({
      path,
      body: mockBrand
    });
    const brandWithId1 = res.body;
    res = await app.post({
      path,
      body: mockBrand
    });
    const brandWithId2 = res.body;

    // verifying there are 2 brands
    res = await app.get({
      path
    });
    expect(res.body).toStrictEqual([brandWithId1, brandWithId2]);

    // deleting both brands
    res = await app.delete({
      path,
      body: [brandWithId1.id, brandWithId2.id]
    })
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(1);
    expect(res.body.deletedCount).toBe(2);

    // verifying there are 0 brands
    res = await app.get({
      path
    });
    expect(res.body).toStrictEqual([]);
  });

  afterAll(async () => {
    await app.close();
  });
});