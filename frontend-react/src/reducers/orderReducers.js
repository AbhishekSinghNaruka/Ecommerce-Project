
export const newOrderReducer = (state={},action) =>{
  switch(action.type){
    case "CREATE_ORDER_REQUEST":
      return{
        ...state,
        loading: true,
      }
    case "CREATE_ORDER_SUCCESS":
      return{
        loading:false,
        order: action.payload
      }
    case "CREATE_ORDER_FAILURE":
        return{
          loading:false,
          error: action.payload
        }
    case "CLEAR_ERROR":
      return{
        ...state,
        error: null
      }
    default:
      return state;
  }
}

export const myOrdersReducer = (state={orders:[]},action) =>{
  switch (action.type) {
    case "MY_ORDER_REQUEST":
      return{
        loading:true
      }

    case "MY_ORDER_SUCCESS":
      return{
        loading:false,
        orders:action.payload
      }

    case "MY_ORDER_FAILURE":
      return{
        loading:false,
        error:action.payload
      }

    case "CLEAR_ERROR":
      return{
        ...state,
        error: null
      }

    default:
      return state;
  }
}

export const ordersDeatilsReducer = (state={orders:[]},action) =>{
  switch (action.type) {
    case "ORDER_DEATLS_REQUEST":
      return{
        loading:true
      }

    case "ORDER_DEATLS_SUCCESS":
      return{
        loading:false,
        order:action.payload
      }

    case "ORDER_DEATLS_FAILURE":
      return{
        loading:false,
        error:action.payload
      }

    case "CLEAR_ERROR":
      return{
        ...state,
        error: null
      }

    default:
      return state;
  }
}
