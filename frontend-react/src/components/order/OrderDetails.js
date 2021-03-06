import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import {useAlert} from 'react-alert';
import {useDispatch,useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';

import Loader from '../Loader';
import {getOrderDetails,clearError} from '../../actions/orderActions';


const OrderDetails = () => {

  const alert = useAlert();
  const dispatch=useDispatch();
  let params=useParams();

  const {loading,error,order={}} = useSelector(state => state.orderDetails);
  const {shippingInfo,orderItems,user,totalPrice,shippingStatus} = order;
  const isPaid = order.paymentInfo && order.paymentInfo.status==='succeeded'?true:false;

  useEffect(()=>{
      dispatch(getOrderDetails(params.id));

      if(error){
        alert.error(error);
        dispatch(clearError);
      }
  },[dispatch,alert,error,params]);

  const shippingAddress = order.shippingInfo && `${ order.shippingInfo.address}, ${ order.shippingInfo.pincode}, ${ order.shippingInfo.city}, ${ order.shippingInfo.country}`

  return(
    <React.Fragment>
      {loading?(<Loader />):(
        <React.Fragment>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">

              <h1 className="my-5">Order # {order._id}</h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p><b>Name:</b> {order.user && order.user.name}</p>
              <p><b>Phone:</b> {order.shippingInfo && order.shippingInfo.phoneNum}</p>
              <p className="mb-4"><b>Address:</b>{shippingAddress}</p>
              <p><b>Amount:</b> {totalPrice}</p>

              <hr />

              <h4 className="my-4">Payment</h4>
              <p className={isPaid ?"greenColor":"redColor"}><b>{isPaid?"PAID":"NOT PAID"}</b></p>


              <h4 className="my-4">Order Status:</h4>
              <p className={order.shippingStatus && String(order.shippingStatus).includes('Delivered')
                ?"greenColor":"redColor"} ><b>{order.shippingStatus}</b></p>


              <h4 className="my-4">Order Items:</h4>

              <hr />
              <div className="cart-item my-1">
                {order.orderItems && order.orderItems.map( item => (
                  <div key ={item.product} className="row my-5">
                    <div className="col-4 col-lg-2">
                      <img src={item.image} alt={item.name} height="45" width="65" />
                    </div>

                    <div className="col-5 col-lg-5">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>


                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p>&#8377;{item.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <p>{item.quantity} Piece(s)</p>
                    </div>
                  </div>
                ))}

              </div>
              <hr />
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default OrderDetails;
