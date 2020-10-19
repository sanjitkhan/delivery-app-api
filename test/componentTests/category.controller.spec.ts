import { getModelForClass } from '@typegoose/typegoose';
import { mockCategory } from '../mocks/category';
import { CategoryController } from '../../src/components/category/category.controller';
import { Category } from '../../src/components/category/category.model';
import { CategoryService } from '../../src/components/category/category.service';

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;
  let categoryModel;

  beforeEach(() => {
    categoryModel = getModelForClass(Category);
    categoryService = new CategoryService(categoryModel);
    categoryController = new CategoryController(categoryService);
  });

  it('should test findAll method of category service', async () => {
    const result = [mockCategory];
    jest.spyOn(categoryService, 'findAll').mockImplementation(() => Promise.resolve([mockCategory]));
    expect(await categoryController.findAll()).toStrictEqual(result);
  });
  it('should test find method of category service', async () => {
    const result = mockCategory;
    jest.spyOn(categoryService, 'find').mockImplementation(() => Promise.resolve(mockCategory));
    expect(await categoryController.find("1")).toStrictEqual(result);
  });
  it('should test create method of category service', async () => {
    const result = mockCategory;
    jest.spyOn(categoryService, 'create').mockImplementation(() => Promise.resolve(mockCategory));
    expect(await categoryController.create(mockCategory)).toStrictEqual(result);
  });
  it('should test removeOne method of category service', async () => {
    const result = {
      n: 1,
      ok: 1
    };
    jest.spyOn(categoryService, 'removeOne').mockImplementation(() => Promise.resolve(result));
    expect(await categoryController.removeOne("1")).toStrictEqual(result);
  });
  it('should test removeMany method of category service', async () => {
    const result = {
      n: 1,
      ok: 1
    };
    jest.spyOn(categoryService, 'removeMany').mockImplementation(() => Promise.resolve(result));
    expect(await categoryController.removeMany(["1","2"])).toStrictEqual(result);
  });
  it('should test updateSomeProperties method of category service', async () => {
    const result = mockCategory;
    jest.spyOn(categoryService, 'updateSomeProperties').mockImplementation(() => Promise.resolve(mockCategory));
    expect(await categoryController.updateSomeProperties("1", mockCategory)).toStrictEqual(result);
  });
  it('should test updateAllProperties method of category service', async () => {
    const result = mockCategory;
    jest.spyOn(categoryService, 'updateAllProperties').mockImplementation(() => Promise.resolve(mockCategory));
    expect(await categoryController.updateAllProperties("1", mockCategory)).toStrictEqual(result);
  });
});
