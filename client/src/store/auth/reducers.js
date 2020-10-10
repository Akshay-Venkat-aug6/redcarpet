const initialState = {
  token: '',
  isSuccessed: false,
  isCustomer: false
};

const userReducer = (state = initialState, action) => {
  switch(action.type){
    case 'USER':
      console.log(action.payload)
      return {
        ...state,
        token: action.payload.token,
        isSuccessed: action.payload.isSuccessed,
        isCustomer: action.payload.role
      }
    case 'LOGOUT':
      console.log(action.payload)
      return {
        ...state,
        isSuccessed: action.payload.isSuccessed
      }
    case 'ADMIN':
      return {
        ...state,
        token: action.payload.token,
        isSuccessed: action.payload.isSuccessed,
      }
    default:
      return state
  }
};

export default userReducer;