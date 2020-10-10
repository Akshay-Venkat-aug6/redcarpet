const initialState = {
  loandetails: [],
  isSuccess: false,
  emiAmount: '',
  duration: '',
  interestAmouont: '',
  principleAmount: '',
  totalAmount: '',
  rate: '',
  isLoanDetails: false,
  loanView: [],
  isVerified: false,
  loanCustomerView: [],
  searchContent: []
};

const loanReducer = ( state = initialState, action ) => {
  switch(action.type){
    case "LOAN_MESSAGE":
      return {
        ...state,
        isSuccess: true
      }
    case "LOAN_CREATE":
      return{
        ...state,
        emiAmount: action.payload.emiAmount,
        duration: action.payload.duration,
        interestAmount: action.payload.interestAmount,
        principleAmount: action.payload.principleAmount,
        totalAmount: action.payload.totalAmount,
        rate: action.payload.rate,
        loandetails: action.payload.emiDetails,
        isLoanDetails: true
      }
    case 'GET_LOAN':
      return {
        ...state,
        loanView: action.payload.loanDetail,
        searchContent: action.payload.loanDetail,
        isVerified: action.payload.isVerified
      }
    case 'CUSTOMER_LOAN':
      return {
        ...state,
        loanCustomerView: action.payload.loanDetail,
        searchContent: action.payload.loanDetail,
        isVerified: action.payload.isVerified
      }
    case 'SEARCH_STATUS':
      console.log(action.payload.loan)
      return {
        ...state,
        searchContent: action.payload.loan
      }
    default:
      return state
  }
};

export default loanReducer