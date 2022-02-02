import React, {useState , useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';

import {resetPassword, clearError} from '../../actions/userActions';

const NewPassword = () => {

  const alert = useAlert();
  const dispatch=useDispatch();
  const navigate = useNavigate();
  let params=useParams();

  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');

  const {success,error} =useSelector(state => state.forgotPassword);

  useEffect(()=> {

    if(error){
      alert.error(error);
      dispatch(clearError());
    }

    if(success){
      alert.success("Password was successfully changed");
      navigate('/login');
    }

  },[dispatch,error,success,alert]);

  const submitHandler =(e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('password',password);
    formData.set('confirmPassword',confirmPassword);
    dispatch(resetPassword(params.token,formData));
  };
  return (
    <React.Fragment>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">New Password</h1>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password_field">Confirm Password</label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              id="new_password_button"
              type="submit"
            className="btn btn-block py-3">
              Set Password
            </button>

          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewPassword;
