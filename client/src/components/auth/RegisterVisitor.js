import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { registerVisitor } from '../../actions/auth';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
  linkTag: {
    textDecoration: 'none',
    color: 'inherit',
  }
}));

const RegisterVisitor = ({ setAlert, registerVisitor, isVisitorAuth }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    address: ''
  });

  const { name, email, password, password2, address } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      registerVisitor({ name, email, password, address });
    }
  };

  if (isVisitorAuth) {
    return <Redirect to='/home' />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
      </Typography>
        <form
          className={classes.form}
          onSubmit={e => onSubmit(e)}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Full name"
                autoFocus
                value={name}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="address"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Address"
                // autoFocus
                value={address}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm password"
                type="password"
                id="password2"
                autoComplete="current-password"
                value={password2}
                onChange={e => onChange(e)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
        </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='loginVisitor' variant="body2">
                Already have an account? Sign in
            </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="primary" to='/' className={classes.linkTag}>
            eda.uz
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </Container>
  );
};

RegisterVisitor.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerVisitor: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isVisitorAuth: state.auth.isVisitorAuth
});

export default connect(
  mapStateToProps,
  { setAlert, registerVisitor }
)(RegisterVisitor);