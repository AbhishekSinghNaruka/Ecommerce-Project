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
