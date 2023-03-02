import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams';
import { allTeams, team } from './Mocks/team.mock'

chai.use(chaiHttp);

const { expect } = chai;

describe('Get /teams', () => {
  beforeEach(() => sinon.restore());

  it('response status 200 and correct body', async () => {
    sinon.stub(Teams, 'findAll').resolves(allTeams as Teams[]);

    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.eq(allTeams);
  });
});

describe('Get /teams/:id', () => {
  beforeEach(() => sinon.restore());

  it('response status 200 and correct body', async () => {
    sinon.stub(Teams, 'findOne').resolves(team as Teams);

    const response = await chai.request(app).get('/teams/1');

    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.eq(team);
  });
});