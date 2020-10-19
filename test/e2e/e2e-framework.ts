import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

export interface RequestOptions {
  path: string;
  query?: any;
  body?: any;
  headers?: { [key: string]: string };
}

class TestApplication {
  private app: INestApplication;
  private moduleFixture: TestingModule;

  async init() {
    this.moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.app = this.moduleFixture.createNestApplication();
    await this.app.init();
  }
  
  get request() {
    return request(this.app.getHttpServer());
  }

  get(options: RequestOptions): Promise<request.Response> {
    return this.request
      .get(options.path)
      .set(options.headers || {})
      .query(options.query);
  }

  post(options: RequestOptions): Promise<request.Response> {
    return this.request
      .post(options.path)
      .send(options.body);
  }

  put(options: RequestOptions): Promise<request.Response> {
    return this.request
      .put(options.path)
      .send(options.body);
  }

  patch(options: RequestOptions): Promise<request.Response> {
    return this.request
      .patch(options.path)
      .send(options.body);
  }

  delete(options: RequestOptions): Promise<request.Response> {
    return this.request
      .delete(options.path)
      .send(options.body);
  }

  async close() {
    await this.app.close();
  }
}

export default new TestApplication();
