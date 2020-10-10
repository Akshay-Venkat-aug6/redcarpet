const initialState = {
  agents: [],
  user: [],
  isAuthenticated: false,
  isError: false,
  loan: [],
  searchContent: []
};

const homeReducer = (state = initialState, action) => {
  switch(action.type){
    case 'CUSTOMERHOME':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        agents: action.payload.agents,
        isError: action.payload.error
      }
    case 'AGENTHOME':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        isError: action.payload.error
      }
    case 'ADMINHOME':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        loan: action.payload.loan,
        isError: action.payload.error,
        searchContent: action.payload.loan
        }
    case 'SEARCH_STATUS':
      return {
        ...state,
        searchContent: action.payload.loan
      }
    default:
      return state
  }
};

export default homeReducer