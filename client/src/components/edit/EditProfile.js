import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { createProfile } from '../../actions/profile';
import PropTypes from 'prop-types';

const EditProfile = ({
  setAlert,
  createProfile,
  auth: { user },
  history,
  isAuthenticated
}) => {
  const [formData, setFormData] = useState({
    user,
    address: '',
    organization: '',
  });

  // const { firstName, lastName, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const { address, organization } = formData
  
  const onSubmit = async e => {
    e.preventDefault();
    if (!address || !organization) {
      setAlert('Fill all the fields.', 'danger');
    } else {
      createProfile(formData);
      history.push('/dashboard')
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Profile</h1>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='571  Farnum Road New York'
            name='address'
            value={address}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Restaurante Benazuza'
            name='organization'
            value={organization}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Edit' />
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  setAlert: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, createProfile }
)(EditProfile);