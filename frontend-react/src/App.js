import {useEffect, useState} from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import store from './store';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProductDetails from './components/ProductDetails';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';

import {loadUser} from './actions/userActions';

function App() {
  const [stripeApiKey,setStripeApiKey] = useState('');
  useEffect(()=>{
    store.dispatch(loadUser());
    async function getStripeApiKey(){
      const {data} = await axios.get('/api/stripeApi');
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  },[]);

  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/search/:keyword" element={<Home />} exact/>
            <Route path="/product/:pid" element={<ProductDetails />} exact/>

            <Route path="/cart" element={<Cart />}/>
            <Route path="/shipping" element={<Shipping />}/>
            <Route path="/order/confirm" element={<ConfirmOrder />}/>
            <Route path="/success" element={<OrderSuccess/>}/>
            {stripeApiKey &&
              <Route path="/payment" element={<Elements stripe={loadStripe(stripeApiKey)}>
                <Payment/>
              </Elements>}
              />
            }

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/me/update" element={<UpdateProfile />} exact/>
            <Route path="/password/update" element={<UpdatePassword />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<NewPassword />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
