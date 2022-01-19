import {useEffect} from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

import store from './store';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import ProductDetails from './components/ProductDetails';
import {loadUser} from './actions/userActions';

function App() {

  useEffect(()=>{
    store.dispatch(loadUser());
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
