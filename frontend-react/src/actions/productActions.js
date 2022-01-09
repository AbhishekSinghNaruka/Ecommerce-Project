import axios from 'axios';

export const getProducts = (keyword="",currentPage=1,price,category,rating=0) => async(dispatch) => {

  try {
      dispatch({type:'ALL_PRODUCT_REQUEST'});
      console.log(`/api/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&rating[gte]=${rating}`);
      let link=`/api/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&rating[gte]=${rating}`;
      if(category)
        link=`/api/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&rating[gte]=${rating}`
      const {data}=await axios.get(link);
      console.log(data);
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
