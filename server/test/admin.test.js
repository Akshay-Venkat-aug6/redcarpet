const app = require('../index');
const request = require('supertest');
const { expect } = require('chai');
const User = require('../model/User');
const should = require('should');

let registerData = {
  username: "admin",
  password: "admin"
}


describe(' Admin testing ', () => {
  
  describe('checking the Login for Admin', async() => {
    it('check the login', () => {
      request(app)
        .post('/api/admin/login')
        .send(registerData)
        .expect(200)
        .end(function (err, res) {
          // console.log(res.body)
          expect(res.body.isLogined).to.be.equal(true);
          expect(res.body.token).to.be.a('string');
          
        });
        //done();
    });
  
    it('throws the error if the body is null', () => {
      request(app)
        .post('/api/admin/login')
        .send({username: "", password: ""})
        .end(function (err, res) {
          expect(res.body.isLogined).to.equal(false);
        });
        //done();
    });
  });
});