import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
chai.use(chaiHttp);

const { expect } = chai;

describe('Get /matches', () => {
  beforeEach(() => sinon.restore());
  it('response status 200', async () => {
    const response = await chai.request(app).get('/matches');
 
    expect(response.status).to.equal(200);
  });
});