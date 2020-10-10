import { CustomerHome, AgentHome, AdminHome } from '../../api/Api';

export const customerHome =() => {
  return async(dispatch) => {
    const { data } = await CustomerHome();
    let error ;
    if(!data.isAuthenticaed){
      error =  true
    }
    dispatch({
      type: "CUSTOMERHOME",
      payload:{
        agents: data.agent,
        isAuthenticated: data.isAuthenticaed,
        error: error
      }
    })
  }
};

export const agenthome =() => {
  return async(dispatch) => {
    const { data } = await AgentHome();
    let error ;
    if(!data.isAuthenticaed){
      error =  true
    }
    dispatch({
      type: "AGENTHOME",
      payload:{
        user: data.user,
        isAuthenticated: data.isAuthenticaed,
        error: error
      }
    })
  }
};

export const adminHome =() => {
  return async(dispatch) => {
    const { data } = await AdminHome();
    console.log(data)
    let error ;
    if(!data.isAuthenticaed){
      error =  true
    }
    dispatch({
      type: "ADMINHOME",
      payload:{
        loan: data.loan,
        isAuthenticated: data.isAuthenticaed,
        error: error
      }
    })
  }
};

export const searchStatus = (search, loan) => {
  return async(dispatch) => {
    var loanlist = [];
    loan.map( loanDetails => {
      if(loanDetails.status === search){
        loanlist.push(loanDetails)
      }
    });
    dispatch({
      type: 'SEARCH_STATUS',
      payload: {
        loan: loanlist
      }
    })
  }
}