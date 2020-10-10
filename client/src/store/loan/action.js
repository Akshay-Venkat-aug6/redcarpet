import { Requesttoagent, CreateLoan, getAgentLoan, getCustomerLoan, updateLoan } from '../../api/Api';


export const RequestMessagetoagent = (agentid, loanMessage) => {
  return async(dispatch) => {
    const { data } = await Requesttoagent(agentid, loanMessage);
    console.log(data);
    dispatch({
      type: "LOAN_MESSAGE",
      payload:{
        data: data
      }
    })
  }
}

export const CreateLoanDetails = (loanData, customerid) => {
  return async(dispatch) => {
    const { data } = await CreateLoan(loanData, customerid);
    console.log(data)
    dispatch({
      type: "LOAN_CREATE",
      payload: {
        emiAmount: data.emiAMount,
        duration: data.duration,
        interestAmount: data.interestAmount,
        principleAmount: data.principleAmount,
        totalAmount: data.totalAmount,
        rate: data.rate,
        emiDetails: data.EMIDetails
      }
    })
  }
}

export const getAgentLoans = (agentid) => {
  return async(dispatch) => {
    const { data } = await getAgentLoan(agentid)
    dispatch({
      type: "GET_LOAN",
      payload: data
    })
  }
}

export const getCustomerLoans = (customerid) => {
  return async(dispatch) => {
    const { data } = await getCustomerLoan(customerid);
    dispatch({
      type: "CUSTOMER_LOAN",
      payload: data
    })
  }
};

export const updateLoans = (loanid, status) => {
  return async(dispatch) => {
    const { data } = await updateLoan(loanid, status);
  }
}

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