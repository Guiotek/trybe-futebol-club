import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Users from '../database/models/Users';
import * as bcrypt from 'bcryptjs';

import { app } from '../app';
chai.use(chaiHttp);

const { expect } = chai;

const Login = {
  email: "admin@admin.com",
  password: "secret_admin"
}

const invalidLogin = {
  email: "aaaa@aaaaa.com",
  password: "aaaaaa"
}

const user = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
}

describe('Post /login', () => {
  beforeEach(() => sinon.restore());
  it('response status 200 and correct body', async () => {
     sinon.stub(bcrypt, 'compareSync').resolves(true);
 
     const response = await chai.request(app).post('/login').send( Login );
     console.log(response);
     
 
     expect(response.status).to.equal(200);
  });

  it('response status 401 and incorrect body', async () => {
    sinon.stub(bcrypt, 'compareSync').resolves(false);

    const response = await chai.request(app).post('/login').send( invalidLogin );

    expect(response.status).to.equal(401);
 });
});
