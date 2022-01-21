import React, {useState , useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import {useNavigate} from 'react-router-dom';

import {loadUser, updatePassword, clearError} from '../../actions/userActions';

const UpdatePassword = () => {

  const alert = useAlert();
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const [oldPassword,setOldPassword] = useState('');
  const [newPassword,setNewPassword] = useState('');

  const {isUpdated,error,loading} =useSelector(state => state.user);

  useEffect(()=> {

    if(error){
      alert.error(error);
      dispatch(clearError());
    }

    if(isUpdated){
      alert.success("Password updated successfully");

      navigate('/me');
      dispatch({type:"UPDATE_PASSWORD_RESET"});
    }

  },[dispatch,error,isUpdated,alert]);

  const submitHandler =(e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('oldPassword',oldPassword);
    formData.set('newPassword',newPassword);
    formData.set('confirmPassword',newPassword);

    dispatch(updatePassword(formData));
  };

  return (
    <React.Fragment>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mt-2 mb-5">Update Password</h1>
            <div className="form-group">
              <label for="old_password_field">Old Password</label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label for="new_password_field">New Password</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn update-btn btn-block mt-4 mb-3"
            disabled={loading ? true : false}>Update Password</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UpdatePassword;
