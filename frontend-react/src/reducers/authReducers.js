

export const authReducer=(state={user:{}},action) =>{
  switch(action.type){
    case "LOGIN_REQUEST":
    case "USER_REGISTER_REQUEST":
    case "LOAD_USER_REQUEST":
      return{
        loading:true,
        isAuthenticated:false
      }

    case "LOGIN_SUCCESS":
    case "USER_REGISTER_SUCCESS":
    case "LOAD_USER_SUCCESS":
      return{
        ...state,
        loading:false,
        isAuthenticated:true,
        user:action.payload
      //  token:action.payload.token
      }
    case "LOGOUT_SUCCESS":
      return{
        loading:false,
        isAuthenticated:false,
        user:null
      }

    case "LOAD_USER_FALIURE":
      return{
        loading:false,
        isAuthenticated:false,
        user:null
      }

    case "LOGIN_FALIURE":
      return{
        ...state,
        error:action.payload
      }

    case "LOGIN_FALIURE":
    case "USER_REGISTER_FALIURE":
      return{
        ...state,
        loading:false,
        isAuthenticated:false,
        user:null,
        error:action.payload
      }

      case "CLEAR_ERROR":
      return{
        ...state,
        error:null
      }

    default:
      return state;
  }
};

export const userReducer = (state={}, action) =>{
  switch(action.type){
    case "UPDATE_PROFILE_REQUEST":
    case "UPDATE_PASSWORD_REQUEST":
      return{
        ...state,
        loading:true
      }

    case "UPDATE_PROFILE_SUCCESS":
    case "UPDATE_PASSWORD_SUCCESS":
      return {
        ...state,
        loading:false,
        isUpdated:action.payload
      }

    case "UPDATE_PROFILE_FAILURE":
    case "UPDATE_PASSWORD_FAILURE":
      return{
        ...state,
        loading:false,
        error:action.payload
      }

    case "UPDATE_PROFILE_RESET":
    case "UPDATE_PASSWORD_RESET":
      return{
        ...state,
        isUpdated:false
      }

    case "CLEAR_ERROR":
      return{
        ...state,
        error:null
      }

    default:
      return state;
  }

};
