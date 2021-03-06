import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '@shared/infra/database';
import { app } from '@shared/infra/http/app';

let connection: Connection;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at) 
    VALUES ('${id}', 'Admin', 'admin@email.com', '${password}', true, 'DL_XX1234', 'now()')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@email.com',
      password: 'admin'
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Hatch',
        description: 'Hatch car'
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new category with name exists', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@email.com',
      password: 'admin'
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Hatch',
        description: 'Hatch car'
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.status).toBe(400);
  });
});
