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
    // let chaiHttpResponse: Response;
    let response: any;

  before(async () => {
    sinon.stub(User, 'findOne').callsFake(userMock.findOne);
  // })
  // before(async () => {
    const reqBody = {};
    response = await chai.request(app)
      .post('/login')
      .send(reqBody);

    // sinon
    //   .stub(User, "findOne")
    //   .resolves({
    //     ...UserMock
    //   } as User);
  });

  // after(()=>{
  //   // (User.findOne as sinon.SinonStub).restore();
  //   userMock.findOne.restore();
  // })

  it('retorna código de status "400"', async () => {
    expect(response).to.have.status(400);
    // chaiHttpResponse = await chai
    //    .request(app)
    //    ...

    // expect(...)
  });

  })
  

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});
