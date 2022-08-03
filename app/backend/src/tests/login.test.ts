import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
const { User: userMock } = require('./mocks');

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  describe ('Quando não é passado usuário e senha', () => {
    let response: Response;

    before(async () => {
      sinon.stub(User, 'findOne').callsFake(userMock.findOne);

      const reqBody = {};
      response = await chai.request(app)
        .post('/login')
        .send(reqBody);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('retorna código de status "400"', async () => {
      expect(response).to.have.status(400);
    });

    it('retorna a mensagem "All fields must be filled"', async () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  })

  describe ('Quando é passado usuário inválido', () => {
    let response: Response;

    before(async () => {
      sinon.stub(User, 'findOne').callsFake(userMock.findOne);

      const reqBody = {
        email: 'teste.com',
        password: '1234567'
      };
      response = await chai.request(app)
        .post('/login')
        .send(reqBody);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('retorna código de status "401"', async () => {
      expect(response).to.have.status(401);
    });

    it('retorna a mensagem "Incorrect email or password"', async () => {
      expect(response.body.message).to.be.equal('Incorrect email or password');
    });
  })

  describe ('Quando é passado password inválido', () => {
    let response: Response;

    before(async () => {
      sinon.stub(User, 'findOne').callsFake(userMock.findOne);

      const reqBody = {
        email: 'teste@teste.com',
        password: '123'
      };
      response = await chai.request(app)
        .post('/login')
        .send(reqBody);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('retorna código de status "401"', async () => {
      expect(response).to.have.status(401);
    });

    it('retorna a mensagem "Incorrect email or password"', async () => {
      expect(response.body.message).to.be.equal('Incorrect email or password');
    });
  })
});
