const ALL_PRODUCT_REQUEST ='ALL_PRODUCT_REQUEST';
const ALL_PRODUCT_SUCCESS ='ALL_PRODUCT_SUCCESS';
const ALL_PRODUCT_FALIURE ='ALL_PRODUCT_FALIURE';
const PRODUCT_DETAILS_REQUEST ='PRODUCT_DETAILS_REQUEST';
const PRODUCT_DETAILS_SUCCESS ='PRODUCT_DETAILS_SUCCESS';
const PRODUCT_DETAILS_FALIURE ='PRODUCT_DETAILS_FALIURE';
const CLEAR_ERROR='CLEAR_ERROR';

export const productReducer = (state={products:[]},action) => {
  switch (action.type){
    case ALL_PRODUCT_REQUEST:
    return {
      loading:true,
      products:[]
    };

    case ALL_PRODUCT_SUCCESS:
    return{
      loading:false,
      products:action.payload.products,
      productCount:action.payload.productCount,
      resPerPage:action.payload.resPerPage,
      filteredProductsCount:action.payload.filteredProductsCount
    }

    case ALL_PRODUCT_FALIURE:
    return{
      loading:false,
      error:action.payload
    }

    case CLEAR_ERROR:
    return{
      ...state,
      error:null
    }

    default:
      return state;
  }
};

export const productDetailReducer =(state={product:{}},action) =>{
  switch(action.type){
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading:true,
        ...state
      }

    case PRODUCT_DETAILS_SUCCESS:
     return{
       loading:false,
       product:action.payload
     }

     case PRODUCT_DETAILS_FALIURE:
     return{
       loading:false,
       error:action.payload
     }

     case CLEAR_ERROR:
     return{
       ...state,
       error:null
     }

    default:
      return state;
  }
};

export const newReviewReducer = (state={},action) =>{
  switch (action.type) {
    case "NEW_REVIEW_REQUEST":
        return{
          ...state,
          loading:true
        }

    case "NEW_REVIEW_SUCCESS":
      return{
        loading:false,
        success:action.payload
      }

    case "NEW_REVIEW_FAILURE":
      return{
        loading:false,
        error:action.payload
      }

    case "NEW_REVIEW_RESET":
        return{
          ...state,
          success:false
        }

    case "CLEAR_ERROR":
      return{
        ...state,
        error:null
      }

     default:
       return state;
  }
}
