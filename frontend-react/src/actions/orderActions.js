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

export const myOrders = () => async (dispatch) => {
  try {
    dispatch({type:"MY_ORDER_REQUEST"});
    const {data} = await axios.get('/api/orders/myOrders');
    dispatch({
      type:"MY_ORDER_SUCCESS",
      payload:data.orders
    });
  } catch (e) {
    dispatch({
      type:"MY_ORDER_FAILURE",
      payload:e.response.data.message
    })
  }
}

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({type:"ORDER_DEATLS_REQUEST"});
    const {data} = await axios.get(`/api/order/${id}`);
    console.log(data);
    dispatch({
      type:"ORDER_DEATLS_SUCCESS",
      payload:data.order
    });
  } catch (e) {
    dispatch({
      type:"ORDER_DEATLS_FAILURE",
      payload:e.response.data.message
    })
  }
}

export const clearError = () => async(dispatch) => {
  dispatch({type:'CLEAR_ERROR'});
};
