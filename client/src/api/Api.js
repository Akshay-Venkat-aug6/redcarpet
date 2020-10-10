import axios from 'axios';

let baseUrl = "http://localhost:4000/api";
axios.defaults.headers.common = {'authorization': localStorage.getItem('token')}

export const Register = async (userRegisterCredentials) => {
  return axios.post(`${baseUrl}/register`, userRegisterCredentials);
}

export const Login = async(userCrdentials) => {
  return axios.post(`${baseUrl}/login`, userCrdentials)
}

export const AdminLogin = async(userCrdentials) => {
  return axios.post(`${baseUrl}/admin/login`, userCrdentials)
}

export const CustomerHome = async() => {
  console.log("Customer Home")
  return axios.get(`${baseUrl}/customer/home`, 
          {
            headers:{
              'authorization': localStorage.getItem('token')
            }
          })
}

export const AgentHome = async() => {
  return axios.get(`${baseUrl}/agent/home`, 
          {
            headers:{
              'authorization': localStorage.getItem('token')
            }
          })
}

export const AdminHome = async() => {
  
  return axios.get(`${baseUrl}/admin/home`, 
          {
            headers:{
              'authorization': localStorage.getItem('token')
            }
          })
}

export const Requesttoagent = async (agentid, loanrequestdetails) => {
  // console.log(agentid, loanrequestdetails, localStorage.getItem('token'))
  return axios.post(`${baseUrl}/request/loan/${agentid}`,
                loanrequestdetails,
                {
                  headers:{
                    'authorization': localStorage.getItem('token')
                  }
                })
};

export const Logout = () => {
  return axios({
            method:"POST",
            url: `${baseUrl}/logout`,
            headers: { "authorization": localStorage.getItem('token') }
          })
}

export const CreateLoan = (loanData, customerid) => {
  return axios.post(`${baseUrl}/create/loan/${customerid}`, loanData, 
                {
                  headers: {
                    "authorization": localStorage.getItem('token')
                  }
                })
}

export const getAgentLoan = (agentid) => {
  return axios.get(`${baseUrl}/agent/view/loan`, {
    headers: {
      "authorization": localStorage.getItem('token')
    }
  })
}

export const getCustomerLoan = (agentid) => {
  return axios.get(`${baseUrl}/customer/view/loan`, {
    headers: {
      "authorization": localStorage.getItem('token')
    }
  })
};

export const updateLoan = (loanid, body) => {
  return axios.post(`${baseUrl}/update/loan/status/${loanid}`, { status: body }, {
    headers: {
      "authorization": localStorage.getItem('token')
    }
  })
}