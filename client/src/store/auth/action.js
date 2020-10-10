import { Register, Logout, Login, AdminLogin } from '../../api/Api';

export const register =(userRegisterCredentials) => {
  return async(dispatch) => {
    const { data } = await Register(userRegisterCredentials);
    // console.log(data)
    localStorage.setItem('token', data.token)
    sessionStorage.setItem('isLogged', data.isRegistered)
    let role = false;
    if(data.role === 'customer'){
      role = true
    }
    dispatch({
      type: "USER",
      payload:{
        token: data.token,
        isSuccessed: data.isRegistered,
        role: role
      }
    });
  }
};

export const login =(userCredentials) => {
  return async(dispatch) => {
    const { data } = await Login(userCredentials);
    localStorage.setItem('token', data.token)
    sessionStorage.setItem('isLogged', data.isLogined)
    let role = false;
    if(data.role === 'customer'){
      role = true
    }
    console.log(role, data)
    dispatch({
      type: "USER",
      payload:{
        token: data.token,
        isSuccessed: data.isLogined,
        role: role
      }
    })
  }
};

export const adminLogin =(userCredentials) => {
  return async(dispatch) => {
    const { data } = await AdminLogin(userCredentials);
    localStorage.setItem('token', data.token)
    sessionStorage.setItem('isLogged', data.isLogined)
    dispatch({
      type: "ADMIN",
      payload:{
        token: data.token,
        isSuccessed: data.isLogined
      }
    })
  }
};

export const logout = (history) => {
  return async(dispatch) => {
    const { data } = await Logout();
    console.log(data)
    dispatch({
      type: "LOGOUT",
      payload:{
        isSuccessed: data.isLoggedOut
      }
    })
    if(data.isLoggedOut){
      localStorage.setItem('token', '');
      sessionStorage.setItem('isLogged', false)
    }
    
  }
}