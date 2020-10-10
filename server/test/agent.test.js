const app = require('../index');
const request = require('supertest');
const { expect } = require('chai');
const User = require('../model/User');
const Loan = require('../model/Loan');
const should = require('should');

let registerData = {
  username: "Akshay",
  email: "akshay28venkatss@gmail.com",
  phoneno: "8526726215",
  role: "agent",
  password: "1234567890"
}


describe(' Agent testing ', () => {
  
  describe('checking the Register and Login for Agent', async() => {
    it('register the valid agent', (done) => {
      request(app)
        .post('/api/register')
        .send(registerData)
        .expect(200)
        .end(function (err, res) {
          expect(res.body.isRegistered).to.be.equal(true);
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
  
    it('throws the error if the email is Already registered', (done) => {
      // console.log(registerData)
      request(app)
        .post('/api/register')
        .send(registerData)
        .end(function (err, res) {
          expect(res.body.isRegistered).to.be.equal(false);
          done();
        });
    });
  
    it('throws the error if the body is null', (done) => {
      let registers = {
        username: registerData.username,
        email: registerData.email,
        phoneno: registerData.phoneno,
        role: "",
        password: registerData.password
      }
      request(app)
        .post('/api/register')
        .send(registers)
        .end(function (err, res) {
          expect(res.body.isRegistered).to.equal(false);
          expect(res.body.message).to.be.a('string');
            done();
        });
    });
  });

  describe('Home Page of the agent list', () => {
    it('Render the Home Page with the proper type', (done) => {
      let userData = {
        useremail: registerData.email,
        password: registerData.password,
        role: registerData.role
      };
      request(app)
        .post('/api/login')
        .send(userData)
        .end((err, res) => {
          const token = res.body.token
          request(app)
            .get('/api/agent/home')
            .set('authorization', token)
            .end((err, res) => {
              // console.log(res.body)
              expect(res.body.agent).to.be.a('object');
              expect(res.body.user).to.be.a('array');
            })
          done();
        })
    });
    it('Throw error if the Agent tries to acces home page withour login', (done) => {
      let userData = {
        useremail: registerData.email,
        password: registerData.password,
        role: registerData.role
      };
      request(app)
        .post('/api/login')
        .send(userData)
        .end((err, res) => {
          const token = res.body.token
          request(app)
            .get('/api/agent/home')
            .set('authorization', '')
            .end((err, res) => {
              // console.log(res.body)
              expect(res.body.isTokenVerified).to.be.equal(false);
              
            })
        })
        done();
    });
  });

  describe('Create the Loan ', () => {
    it('Render the Correct Loan Details ', async(done) => {
      let userData = {
        useremail: registerData.email,
        password: registerData.password,
        role: registerData.role
      };
      request(app)
        .post('/api/login')
        .send(userData)
        .end((err, res) => {
          const token = res.body.token
          let registerDatas = {
            username: "Akshay",
            email: "akshay28venkatss6@gmail.com",
            phoneno: "8526726215",
            role: "customer",
            password: "1234567890"
          };
          request(app)
            .post('/api/register')
            .send(registerDatas)
            .end((err, res) => {
              let loanDetail = {
                interestRate: 2, 
                principleValue: 20000, 
                duration : 2
              }
              // console.log(res.body.userid)
              request(app)
                .post(`/api/create/loan/${res.body.userid}`)
                .send(loanDetail)
                .end((err, res) => {
                  expect(res.body.EMIDetails).to.be.a('array');
                  
                })
                Loan.deleteOne({userid: res.body.userid})
            });
            after(async() => {
              await User.deleteOne({email: registerDatas.email, role: registerDatas.role});
              
            });
        });
        done();
    });
  });

  describe('Accessing the Home Page ', () => {
    it('Render the Correct Loan Details ', async(done) => {
      let userData = {
        useremail: registerData.email,
        password: registerData.password,
        role: registerData.role
      };
      request(app)
        .post('/api/login')
        .send(userData)
        .end((err, res) => {
          const token = res.body.token
          request(app)
            .get('/api/agent/view/loan')
            .set('authorization', token)
            .end((err, res) => {
              expect(res.body.isVerified).to.equal(true)
              expect(res.body.loanDetail).to.be.a('array')
            });
        });
      done();
    });

    it('Throws an error if User does not login and try to accessing the Home Page', async(done) => {
      request(app)
        .get('/api/agent/view/loan')
        .set('authorization', '')
        .end((err, res) => {
          expect(res.body.isTokenVerified).to.equal(false)
        });
      done();
    });
  });

  describe('Login Crdentials testing for agent', () => {
    it('login Successfully message', (done) => {
      let userData = {
        useremail: registerData.email,
        password: registerData.password,
        role: registerData.role
      };
      request(app)
        .post('/api/login')
        .send(userData)
        .end((err, res) => {
          expect(res.body.isLogined).to.equal(true);
          expect(res.body.message).to.equal('Login Completed SuccssFully!!!');
          
          done();
        })
    });

    it('Throw error if the body is null', (done) => {
      let userData = {
        useremail: registerData.email,
        password: '',
        role: registerData.role
      }
      request(app)
        .post('/api/login')
        .send(userData)
        .end((err, res) => {
          expect(res.body.isLogined).to.equal(false);
          expect(res.body.message).to.equal('All details should be filled to Login');
          done();
        })
    });

    it('Throw error if the password is incorrect', (done) => {
      let userData = {
        useremail: registerData.email,
        password: '12345678',
        role: registerData.role
      }
      request(app)
        .post('/api/login')
        .send(userData)
        .end((err, res) => {
          expect(res.body.isLogined).to.equal(false);
          expect(res.body.message).to.equal('Password is Invalid');
          done();
        })
    });

    it('Throw error if the Email is not registered', (done) => {
      let userData = {
        useremail: 'akshay28@gmail.com',
        password: registerData.password,
        role: registerData.role
      }
      request(app)
        .post('/api/login')
        .send(userData)
        .end((err, res) => {
          expect(res.body.isLogined).to.equal(false);
          expect(res.body.message).to.equal('Email is not yet registered!!');
          done();
        })
    });
  });

});

setTimeout(() => {
  after(async() => {
    await User.deleteOne({email: registerData.email, role: registerData.role})
  });
})
