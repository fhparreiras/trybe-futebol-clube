import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => {
  describe ('Quando são procuradas as partidas com getAll', () => {
    let response: Response;

  before(async () => {
    response = await chai.request(app).get('/matches');
  });
    it('retorna código de status "200"', async () => {
      expect(response).to.have.status(200);
    });
    it('retorna um objeto no body', async () => {
      expect(response.body).to.be.an('array');
    });
    it('retorna as partidas', async () => {
      expect(response.body[3].homeTeamGoals).to.be.equal(0);
    });
  })
});
