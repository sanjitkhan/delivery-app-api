import { getModelForClass } from '@typegoose/typegoose';
import { Category } from '../../src/components/category/category.model';
import app from './e2e-framework';
import { Response } from 'supertest';
import { CategoryService } from '../../src/components/category/category.service';
import { mockCategory } from '../mocks/category';

const path = '/categories';

describe('Categories', () => {
  let categoryModel;
  let categoryService: CategoryService;
  let categoryWithId: Category = mockCategory; // id will be added after the test case where we add a category
  let pathToCategory = '';

  beforeAll(async () => {
    await app.init();
    categoryModel = getModelForClass(Category);
    categoryService = new CategoryService(categoryModel);
  });

  afterAll(async () => {
    await app.close();
    await categoryModel.remove({});
  });

  it(`should delete all categories`, async () => {
    const res = await categoryService.deleteAllCategories();
    expect(res.ok).toBe(1);
  });

  it(`should add a category`, async () => {
    const res: Response = await app.post({
      path,
      body: mockCategory
    });

    categoryWithId = {
      ...categoryWithId,
      id: res.body.id
    };
    pathToCategory = path + "/" + categoryWithId.id;

    expect(res.status).toBe(201);
    expect(res.body).toStrictEqual(categoryWithId);
  });

  it(`should get all categories`, async () => {
    const res: Response = await app.get({
      path
    });

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual([categoryWithId]);
  });
  it(`should get a single category`, async () => {
    const res: Response = await app.get({
      path: pathToCategory,
    });

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(categoryWithId);
  });

  it(`should update a property of a category`, async () => {
    const res: Response = await app.patch({
      path: pathToCategory,
      body: {
        name: "new name"
      }
    });

    // edit the name in the expected data
    categoryWithId = {
      ...categoryWithId,
      name: "new name"
    };

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(categoryWithId);
  });

  // TODO: edit after an optional property is added
  it(`should update the entire category`, async () => {
    categoryWithId = {
      ...categoryWithId,
      name: "Frozen Foods"
    }    
    const res: Response = await app.put({
      path: pathToCategory,
      body: categoryWithId
    });

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(categoryWithId);
  });

  it(`should delete a category`, async () => {
    const res: Response = await app.delete({
      path: pathToCategory
    });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(1);
  });

  it(`should delete multiple categories`, async () => {
    // adding 2 categories
    let res: Response = await app.post({
      path,
      body: mockCategory
    });
    const categoryWithId1 = res.body;
    res = await app.post({
      path,
      body: mockCategory
    });
    const categoryWithId2 = res.body;

    // verifying there are 2 categories
    res = await app.get({
      path
    });
    expect(res.body).toStrictEqual([categoryWithId1, categoryWithId2]);

    // deleting both categories
    res = await app.delete({
      path,
      body: [categoryWithId1.id, categoryWithId2.id]
    })
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(1);
    expect(res.body.deletedCount).toBe(2);

    // verifying there are 0 categories
    res = await app.get({
      path
    });
    expect(res.body).toStrictEqual([]);
  });

  afterAll(async () => {
    await app.close();
  });
});