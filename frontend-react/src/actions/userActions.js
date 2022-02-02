import axios from 'axios';

export const loginUser = (email,password) => async(dispatch)=>{
  try {
    dispatch({type:'LOGIN_REQUEST'});
    const config={
      headers:{
        'Content-Type': 'application/json'
      }
    }
    const {data} = await axios.post('/api/login',{email,password},config);
    dispatch({
      type:'LOGIN_SUCCESS',
      payload:data.user
    });
  } catch (error) {
      dispatch({
        type:'LOGIN_FALIURE',
        payload:error.response.data.message
      });

  }
};

export const registerUser =(userData) =>async(dispatch)=>{
  try {
    dispatch({type:"USER_REGISTER_REQUEST"});
    const config={
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    }
    const {data} = await axios.post('/api/register',userData,config);
    dispatch({
      type:'USER_REGISTER_SUCCESS',
      payload:data.user
    });
  } catch (error) {
    dispatch({
      type:'USER_REGISTER_FALIURE',
      payload:error.response.data.message
    });
  }
};

export const updateProfile =(userData) =>async(dispatch)=>{
  try {
    dispatch({type:"UPDATE_PROFILE_REQUEST"});
    const config={
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    }
    const {data} = await axios.put('/api/profile/updateProfile',userData,config);
    dispatch({
      type:'UPDATE_PROFILE_SUCCESS',
      payload:data.success
    });
  } catch (error) {
    dispatch({
      type:'UPDATE_PROFILE_FAILURE',
      payload:error.response.data.message
    });
  }
};

export const updatePassword =(passwords) =>async(dispatch)=>{
  try {
    dispatch({type:"UPDATE_PASSWORD_REQUEST"});
    const config={
      headers:{
        'Content-Type': 'application/json'
      }
    }
    const {data} = await axios.put('/api/password/updatePassword',passwords,config);
    dispatch({
      type:'UPDATE_PASSWORD_SUCCESS',
      payload:data.success
    });
  } catch (error) {
    dispatch({
      type:'UPDATE_PASSWORD_FAILURE',
      payload:error.response.data.message
    });
  }
};

export const forgotPassword =(email) =>async(dispatch)=>{
  try {
    dispatch({type:"FORGOT_PASSWORD_REQUEST"});
    const config={
      headers:{
        'Content-Type': 'application/json'
      }
    }
    const {data} = await axios.post('/api/password/forgot',email,config);
    dispatch({
      type:'FORGOT_PASSWORD_SUCCESS',
      payload:data.message
    });
  } catch (error) {
    dispatch({
      type:'UPDATE_PASSWORD_FAILURE',
      payload:error.response.data.message
    });
  }
};


export const resetPassword =(token,passwords) =>async(dispatch)=>{
  try {
    dispatch({type:"NEW_PASSWORD_REQUEST"});
    const config={
      headers:{
        'Content-Type': 'application/json'
      }
    }
    const {data} = await axios.put(`/api/password/reset/${token}`,passwords,config);
    dispatch({
      type:'NEW_PASSWORD_SUCCESS',
      payload:data.success
    });
  } catch (error) {
    dispatch({
      type:'NEW_PASSWORD_FALIURE',
      payload:error.response.data.message
    });
  }
};



export const loadUser =() =>async(dispatch)=>{
  try {
    dispatch({type:"LOAD_USER_REQUEST"});

    const {data} = await axios.get('/api/me');
    dispatch({
      type:'LOAD_USER_SUCCESS',
      payload:data.user
    });
  } catch (error) {
    dispatch({type:'LOAD_USER_FALIURE'});
  }
};

export const logout =() =>async(dispatch)=>{
  try{
      await axios.get('/api/logout');
      dispatch({type:'LOGOUT_SUCCESS'})
  } catch (error) {

    dispatch({
      type:'LOGOUT_FALIURE',
      payload:error.response.data.message
    });
  }
};


export const clearError = () => async(dispatch) => {
  dispatch({type:'CLEAR_ERROR'});
};
