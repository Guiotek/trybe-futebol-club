import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
chai.use(chaiHttp);

const { expect } = chai;

describe('Post /login', () => {
  beforeEach(() => sinon.restore());
  it('response status 200 and correct body', async () => {
  });
});

describe('', () => {
  beforeEach(() => sinon.restore());
});