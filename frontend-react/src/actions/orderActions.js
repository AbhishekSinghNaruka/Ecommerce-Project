import axios from 'axios';

export const createOrder = (order) => async (dispatch,getState) => {
  try {
      dispatch({type:"CREATE_ORDER_REQUEST"});
      const config = {
        headers: {
          'Content-Type':'application/json'
        }
      }
      const {data} = await axios.post('/api/order/new',order,config);
      dispatch({
        type:"CREATE_ORDER_SUCCESS",
        payload:data
      });
  } catch (e) {
      dispatch({
        type:"CREATE_ORDER_FAILURE",
        payload:e.response.data.message
      });

  }
}

export const clearError = () => async(dispatch) => {
  dispatch({type:'CLEAR_ERROR'});
};
