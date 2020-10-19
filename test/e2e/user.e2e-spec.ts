import { getModelForClass } from '@typegoose/typegoose';
import app from './e2e-framework';
import { Response } from 'supertest';
import { mockUser } from '../mocks/user';
import { UserService } from '../../src/components/user/user.service';
import { User } from '../../src/components/user/user.model';

describe('User e2e', () => {
  let userModel;
  let userService: UserService;
  let token = ''; 

  beforeAll(async () => {
    await app.init();
    userModel = getModelForClass(User);
    userService = new UserService(userModel);
  });

  afterAll(async () => {
    await app.close();
    await userModel.remove({});
  });

  it(`should delete all users`, async () => {
    const res = await userService.deleteAllUsers();
    expect(res.ok).toBe(1);
  });

  it(`should register a user who doesn't exist in the db`, async () => {
    let res: Response = await app.post({
      path: '/auth/register',
      body: mockUser
    });

    expect(res.status).toBe(201);
    token = "bearer " + res.body["access_token"];

    res = await app.get({
      path: '/profile',
      headers: {
        Authorization: token
      }
    })
    expect(res.status).toBe(200);
    expect(res.body["username"]).toBe(mockUser.username);
  });

  it(`should not register a user who already exists in the db`, async () => {
    const res: Response = await app.post({
      path: '/auth/register',
      body: mockUser
    });

    expect(res.status).toBe(400);
    expect(res.body["message"]).toEqual("Username already exists!");
  });

  it(`should login a user with correct credentials`, async () => {
    const res: Response = await app.post({
      path: '/auth/login',
      body: mockUser
    });

    expect(res.status).toBe(201);
    token = "bearer " + res.body["access_token"];
  });
  it(`should restrict a login with incorrect credentials`, async () => {
    let res: Response = await app.post({
      path: '/auth/login',
      body: {
        ...mockUser,
        username: 'wrong username'
      }
    });
    expect(res.status).toBe(401);

    res = await app.post({
      path: '/auth/login',
      body: {
        ...mockUser,
        password: 'wrong password'
      }
    });
    expect(res.status).toBe(401);
  });

  it(`should allow access to restricted path with correct token`, async () => {
    const res: Response = await app.get({
      path: '/profile',
      headers: {
        Authorization: token
      }
    });

    expect(res.status).toBe(200);
    expect(res.body["username"]).toEqual(mockUser.username);
  });

  afterAll(async () => {
    await app.close();
  });
});