import React, {useState , useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';

import Loader from './Loader';
import {loginUser,clearError} from '../actions/userActions';

const  Login= () => {

  const alert = useAlert();
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('')

  const {loading,error,isAuthenticated} =useSelector(state => state.auth);

  useEffect(()=> {
    if(isAuthenticated)
      navigate('/');

    if(error){
      alert.error(error);
      dispatch(clearError());
    }
  },[dispatch,error,isAuthenticated]);

  const submitHandler =(e) => {
    e.preventDefault();
    dispatch(loginUser(email,password));
  };

  return (

    <React.Fragment>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>

            <Link to="/register" className="float-right mt-3">New User?</Link>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

/*


*/

export default Login;
