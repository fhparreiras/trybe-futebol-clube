import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /matches', () => {
  describe ('Quando são procuradas as partidas com getAll', () => {
    let response: Response;

  before(async () => {
    response = await chai.request(app).get('/matches');
  });
    it('retorna código de status "200"', async () => {
      expect(response).to.have.status(200);
    });
    it('retorna um array no body', async () => {
      expect(response.body).to.be.an('array');
    });
    it('retorna as partidas', async () => {
      expect(response.body[3].homeTeamGoals).to.be.equal(0);
    });
  })
});

describe('POST /matches', () => {
  describe ('Quando são inclusas partidas sem estar com token', () => {
    let response: Response;

  before(async () => {
    const reqBody = {
      homeTeam: 6,
      awayTeam: 6,
      homeTeamGoals: 2,
      awayTeamGoals: 2
    }
    response = await chai.request(app).post('/matches')
      .send(reqBody);
  });
    it('retorna código de status "401"', async () => {
      expect(response).to.have.status(401);
    });
    it('retorna as partidas', async () => {
      expect(response.body.message).to.be.equal('Sem Token');
    });
  })

  describe ('Quando são inclusas partidas iguais', () => {
    let response: Response;

  before(async () => {
    const reqBodyLogin = {
      email: 'user@user.com',
      password: 'secret_user',
    }
    const loginResponse = await chai.request(app).post('/login')
      .send(reqBodyLogin);

    const reqBodyMatch = {
      homeTeam: 6,
      awayTeam: 6,
      homeTeamGoals: 2,
      awayTeamGoals: 2
    }

    const { token } = loginResponse.body;
    response = await chai.request(app).post('/matches')
      .send(reqBodyMatch).set({ Authorization: token });
  });

    it('retorna código de status "401"', async () => {
      expect(response).to.have.status(401);
    });
    it('retorna a mensagem de erro correspondente', async () => {
      expect(response.body.message).to.be.equal('It is not possible to create a match with two equal teams');
    });
  })
});
