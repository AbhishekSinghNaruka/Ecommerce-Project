import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useAlert} from 'react-alert';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import CheckoutSteps from './CheckoutSteps';

const ConfirmOrder = () => {
  const { cartItems, shippingInfo }  = useSelector(state => state.cart);
  const { user }  = useSelector(state => state.auth);
  const navigate = useNavigate();

  const itemPrice = cartItems.reduce((acc, item) => acc + item.price*item.quantity,0);
  const shippingPrice = itemPrice > 500?50:0;
  const taxPrice = Number((0.18*itemPrice).toFixed(2));
  const totalPrice = (itemPrice+shippingPrice+taxPrice).toFixed(2);

  const proceedToPayment = () => {
    const data = {
      itemPrice: itemPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice
    }
    sessionStorage.setItem('orderInfo',JSON.stringify(data));
    navigate('/payment');
  }

  return(
    <React.Fragment>
      <CheckoutSteps shipping confirmOrder/>
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">

          <h4 className="mb-3">Shipping Info</h4>
          <p><b>Name:</b> {user && user.name} </p>
          <p><b>Phone:</b> {shippingInfo.phoneNum} </p>
          <p className="mb-4"><b>Address:</b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>
          {cartItems.map(item => (
            <React.Fragment>
              <hr />
              <h4 className="mt-4">Your Cart Items:</h4>

              <hr />
              <div className="cart-item my-1" key={item.product}>
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img src={item.image} alt="Laptop" height="45" width="65"/>
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>


                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>{item.quantity} x &#8377;{item.price} = <b>&#8377;{(item.quantity * item.price).toFixed(2)}</b></p>
                  </div>

                </div>
              </div>
              <hr />
            </React.Fragment>
          ))}


        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>Subtotal:  <span className="order-summary-values">&#8377;{itemPrice.toFixed(2)}</span></p>
            <p>Shipping: <span className="order-summary-values">&#8377;{shippingPrice}</span></p>
            <p>Tax:  <span className="order-summary-values">&#8377;{taxPrice}</span></p>

            <hr />

            <p>Total: <span className="order-summary-values">&#8377;{totalPrice}</span></p>

            <hr />
            <button id="checkout_btn" className="btn btn-primary btn-block" onClick={proceedToPayment}>Proceed to Payment</button>
            </div>
          </div>


        </div>
    </React.Fragment>
  );
}

export default ConfirmOrder;
