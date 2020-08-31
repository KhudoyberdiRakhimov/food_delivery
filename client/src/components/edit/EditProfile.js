import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { createProfile } from '../../actions/profile';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'
import Fab from '@material-ui/core/Fab';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FileUpload from '../../utils/FileUpload'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  linkTag: {
    textDecoration: 'none',
    color: 'inherit',
  },
  floatButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}))

const EditProfile = ({
  setAlert,
  createProfile,
  auth: { user },
  history, 
  isAuthenticated
}) => {
  const classes = useStyles()
  const [formData, setFormData] = useState({
    address: '',
    organization: '',
    phone: '',
  });
  const [Images, setImages] = useState([])
  const [Logos, setLogos] = useState([])
  // const { firstName, lastName, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const updateImages = (newImages) => {
    setImages(newImages)
  }

  const updateLogos = (newLogos) => {
    setLogos(newLogos)
  }

  const { address, organization, phone } = formData
  
  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      user: user._id,
      address: address,
      organization: organization,
      phone: phone,
      images: Images,
      logos: Logos,
    }

    if (!address || !organization || !phone || !Images || !Logos ) {
      setAlert('Fill all the fields', 'danger')
    } else {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      axios.post('/api/users/profile', variables, config)
      history.push('/dashboard')
    }
  }

  return (
    <Fragment>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Edit Profile
          </Typography>
          <form
            className={classes.form}
            onSubmit={(e) => onSubmit(e)}
            noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel htmlFor='outlined-adornment-amount'>
                  Poster Image
                </InputLabel>
                <FileUpload refreshFunction={updateImages} />
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor='outlined-adornment-amount'>
                  Logo
                </InputLabel>
                <FileUpload refreshFunction={updateLogos} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete='fname'
                  name='address'
                  variant='outlined'
                  required
                  fullWidth
                  id='firstName'
                  label='Address'
                  autoFocus
                  value={address}
                  onChange={(e) => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete='fname'
                  name='organization'
                  variant='outlined'
                  required
                  fullWidth
                  id='firstName'
                  label='Organization Name'
                  value={organization}
                  onChange={(e) => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-amount'>
                    Phone Number
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-amount'
                    name='phone'
                    value={phone}
                    onChange={(e) => onChange(e)}
                    startAdornment={
                      <InputAdornment position='start'>+</InputAdornment>
                    }
                    labelWidth={120}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              Submit
            </Button>
          </form>
        </div>
        <Box mt={5}>
          <Typography variant='body2' color='textSecondary' align='center'>
            {'Copyright © '}
            <Link color='primary' to='/' className={classes.linkTag}>
              eda.uz
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
      <Fab color='primary' className={classes.floatButton} aria-label='add'>
        <Link className={classes.linkTag} to='/dashboard'>
          <DashboardIcon />
        </Link>
      </Fab>
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