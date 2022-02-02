import React, {useState , useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import {useNavigate} from 'react-router-dom';

import {forgotPassword, clearError} from '../../actions/userActions';

const ForgotPassword = () => {

  const alert = useAlert();
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const [email,setEmail] = useState('');

  const {message,error,loading} =useSelector(state => state.forgotPassword);

  useEffect(()=> {

    if(error){
      alert.error(error);
      dispatch(clearError());
    }

    if(message){
      alert.success(message);
    }

  },[dispatch,error,message,alert]);

  const submitHandler =(e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('email',email);
    dispatch(forgotPassword(formData));
  };

  return(
    <React.Fragment>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Forgot Password</h1>
            <div className="form-group">
              <label for="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}>
              Send Email
            </button>

          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ForgotPassword;
