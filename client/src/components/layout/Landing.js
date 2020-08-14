import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  linkTag: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block'
  }
}));

const Landing = ({ isAuthenticated, isVisitorAuth }) => {
  const classes = useStyles();
  
  if (isVisitorAuth) {
    return <Redirect to='/home' />
  }
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className={classes.root}>
      <h1 style={{ color: 'green' }}>Welcome to eda.uz</h1>
      <ButtonGroup className={classes.root} aria-label="outlined secondary button group">
        <Button style={{ width: '100%' }} variant="contained" color="primary">
          <Link to='/registerVisitor' className={classes.linkTag}>
            Register
          </Link>
        </Button>
        <Button style={{ width: '100%' }} variant="contained" color="secondary">
          <Link to='/loginVisitor' className={classes.linkTag}>
            Login
          </Link>
        </Button>
      </ButtonGroup>
      <h2 style={{textDecoration:'underline'}}>Are you a store owner?</h2>
      <ButtonGroup className={classes.root} aria-label="outlined secondary button group">
        <Button style={{ width: '100%' }} variant="contained" color="primary">
          <Link to='/register' className={classes.linkTag}>
            Register your store
          </Link>
        </Button>
        <Button style={{ width: '100%' }} variant="contained" color="secondary">
          <Link to='/login' className={classes.linkTag}>
            Login as a store owner
          </Link>
        </Button>
      </ButtonGroup>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  isVisitorAuth: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isVisitorAuth: state.auth.isVisitorAuth
});

export default connect(mapStateToProps)(Landing);