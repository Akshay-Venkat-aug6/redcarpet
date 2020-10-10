const app = require('../index');
const request = require('supertest');
const { expect } = require('chai');
const User = require('../model/User');
const should = require('should');

let registerData = {
  username: "Akshay",
  email: "akshay28venkatss@gmail.com",
  phoneno: "8526726215",
  role: "customer",
  password: "1234567890"
}


describe(' User testing ', () => {
  
  describe('checking the Register and Login', async() => {
    it('register the valid user', () => {
      request(app)
        .post('/api/register')
        .send(registerData)
        .expect(200)
        .end(function (err, res) {
          expect(res.body.isRegistered).to.be.equal(true);
          expect(res.body.token).to.be.a('string');
          //done();
        });
    });
  
    it('throws the error if the email is Already registered', () => {
      request(app)
        .post('/api/register')
        .send(registerData)
        .end(function (err, res) {
          expect(res.body.isRegistered).to.be.equal(false);
          //done();
        });
    });
  
    it('throws the error if the body is null', () => {
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
            //done();
        });
    });
  });

  describe('getting array of the agent list', () => {
    it('Thorws an error if trying to access the page without login', () => {
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
          describe('Check The Home Page', () => {
            it('Access The Page after Login', () => {
              request(app)
                .get('/api/customer/home')
                .set("authorization", token)
                .end((err, res) => {
                  // console.log(res.body)
                  expect(res.body.user).to.be.a('object')
                  expect(res.body.agent).to.be.a('array')
                  expect(res.body.isAuthenticaed).to.equal(true);
                  //done(); 
                });
            });
            
            it('Thorws an error if trying to access the page without Login', () => {
              request(app)
                .get('/api/customer/home')
                .set("authorization", '')
                .end((err, res) => {
                  // console.log(res.body)
                  expect(res.body.isTokenVerified).to.equal(false);
                  expect(res.body.message).to.equal('Token is Invalid!!!');
                  //done(); 
                });
            });

            it('list the loan of the User', () => {
              request(app)
                .get('/api/customer/view/loan')
                .set("authorization", token)
                .end((err, res) => {
                  expect(res.body.isVerified).to.equal(true);
                  expect(res.body.loanDetail).to.be.a('array');
                  
                });
                //done(); 
            });

            it('Throw error if list the loan of the User is not login', () => {
              request(app)
                .get('/api/customer/view/loan')
                .set("authorization", '')
                .end((err, res) => {
                  expect(res.body.isTokenVerified).to.equal(false);
                  //done(); 
                });
            });

          });
          //done();
        })
    });
  });

  describe('Login Crdentials testing', () => {
    it('login Successfully message', () => {
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
          
          //done();
        })
    });

    it('Throw error if the body is null', () => {
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
          //done();
        })
    });

    it('Throw error if the password is incorrect', () => {
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
          //done();
        })
    });

    it('Throw error if the Email is not registered', () => {
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
          //done();
        })
    });
  });

});

setTimeout(() => {
  after(async() => {
    await User.deleteOne({email: registerData.email, role: registerData.role})
  });
})
