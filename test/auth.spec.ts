import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';

describe('POST /login', () => {
  it('seharusnya mengembalikan token ketika kredensial valid', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ username: 'admin', password: 'admin' });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('seharusnya mengembalikan 401 ketika kredensial tidak valid', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ username: 'wronguser', password: 'wrongpassword' });

    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('message', 'Kredensial tidak valid');
  });
});
