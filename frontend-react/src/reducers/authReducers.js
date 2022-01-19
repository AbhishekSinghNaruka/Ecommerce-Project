

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
