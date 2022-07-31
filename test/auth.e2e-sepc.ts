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
  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'asdf@asdf.com';
    // manually store  cookies
    const res = request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'asdf' })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});

//dev mode ->  for just used as we want
// test mode ->  wiped
// auth issue!!
