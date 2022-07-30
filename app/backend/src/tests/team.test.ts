import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
const { Team: teamMock } = require('./mocks');
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => {
  describe ('Quando são procurados os times com getAll', () => {
    // let chaiHttpResponse: Response;
    let response: any;

  before(async () => {
    // sinon.stub(Team, 'findAll').callsFake(teamMock.findAll);
    response = await chai.request(app).get('/teams');
  });
    it('retorna código de status "200"', async () => {
      expect(response).to.have.status(200);
    });
    it('retorna um objeto no body', async () => {
      expect(response.body).to.be.an('array');
    });
    it('retorna os times', async () => {
      expect(response.body[1].id).to.be.equal(2);
    });
  })
});
