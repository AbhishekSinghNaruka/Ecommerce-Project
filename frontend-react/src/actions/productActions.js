import axios from 'axios';

export const getProducts = (currentPage=1) => async(dispatch) => {
  try {
      dispatch({type:'ALL_PRODUCT_REQUEST'});
      const {data}=await axios.get(`/api/products?page=${currentPage}`);
      dispatch({
        type:'ALL_PRODUCT_SUCCESS',
        payload:data
      })
  } catch (error) {
    dispatch({
      type:'ALL_PRODUCT_FALIURE',
      payload:error.response.data.message
    });
  }
};

export const getProductDetails = (pid) => async(dispatch) => {
  try {
      dispatch({type:'PRODUCT_DETAILS_REQUEST'});
      const {data}=await axios.get(`/api/product/${pid}`);
      dispatch({
        type:'PRODUCT_DETAILS_SUCCESS',
        payload:data.product
      })
  } catch (error) {
    dispatch({
      type:'PRODUCT_DETAILS_FALIURE',
      payload:error.response.data.message
    });
  }
};


export const clearError = () => async(dispatch) => {
  dispatch({type:'CLEAR_ERROR'});
};
