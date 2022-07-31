import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  // what are two issue!!!??? middle wares are not used because it uses App module directly... no session and validation
  // 1. Create surrogate setup-app.ts to import into the test.
  // 2. Running middlewares in App Module
  it('handles a signup request', () => {
    const email = 'asdf@sdf.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 'asdf@sdf.com', password: 'asdfasdf' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });
});
