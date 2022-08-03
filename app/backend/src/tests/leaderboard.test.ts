import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
const { Match: matchesMock } = require('./mocks');

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes LEADERBOARD', () => {
  describe('GET /leaderboard', () => {
    let response: Response;
  
    before(async () => {
      sinon.stub(Match, 'findAll').callsFake(matchesMock.findAll);
  
      response = await chai.request(app)
        .get('/leaderboard')
    });
  
    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    })
  
    it('retorna código de status "200"', async () => {
      expect(response).to.have.status(200);
    });
  
    it('retorna um array no body', async () => {
      expect(response.body).to.be.an('array');
    });
  
    it('retorna as partidas', async () => {
      expect(response.body[0].goalsFavor).to.be.equal(9);
    });
  });

  describe('GET /leaderboard/home', () => {
    let response: Response;
  
    before(async () => {
      sinon.stub(Match, 'findAll').callsFake(matchesMock.findAll);
  
      response = await chai.request(app)
        .get('/leaderboard/home')
    });
  
    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    })
  
    it('retorna código de status "200"', async () => {
      expect(response).to.have.status(200);
    });
  
    it('retorna um array no body', async () => {
      expect(response.body).to.be.an('array');
    });
  
    it('retorna as partidas', async () => {
      expect(response.body[0].goalsFavor).to.be.equal(6);
    });
  });

  describe('GET /leaderboard/away', () => {
    let response: Response;
  
    before(async () => {
      sinon.stub(Match, 'findAll').callsFake(matchesMock.findAll);
  
      response = await chai.request(app)
        .get('/leaderboard/away')
    });
  
    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    })
  
    it('retorna código de status "200"', async () => {
      expect(response).to.have.status(200);
    });
  
    it('retorna um array no body', async () => {
      expect(response.body).to.be.an('array');
    });
  
    it('retorna as partidas', async () => {
      expect(response.body[0].goalsBalance).to.be.equal(-3);
    });
  });
})

