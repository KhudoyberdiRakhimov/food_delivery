import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import axios from 'axios'
import Fab from '@material-ui/core/Fab';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {setAlert}from '../../actions/alert'
import { uploadProduct } from '../../actions/product'
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
}));

const Categories = [
  { key: 1, value: 'Grill' },
  { key: 2, value: 'Pizza' },
  { key: 3, value: 'Burgers' },
  { key: 4, value: 'Salads' },
  { key: 5, value: 'Coffee' }
]

const UploadProduct = ({
  auth: { user },
  history,
  uploadProduct,
  setAlert
}) => {
  const classes = useStyles()

  const [TitleValue, setTitleValue] = useState("")
  const [DescriptionValue, setDescriptionValue] = useState("")
  const [PriceValue, setPriceValue] = useState(0)
  const [DeliveryValue, setDeliveryValue] = useState(0)
  const [CategoryValue, setCategoryValue] = useState(1)

  const [Images, setImages] = useState([])


  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value)
  }

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value)
  }

  const onPriceChange = (event) => {
    setPriceValue(event.currentTarget.value)
  }

  const onDeliveryChange = (event) => {
    setDeliveryValue(event.currentTarget.value)
  }

  const onCategorySelectChange = (event) => {
    setCategoryValue(event.currentTarget.value)
  }

  const updateImages = (newImages) => {
    setImages(newImages)
  }
  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      user: user._id,
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      deliveryPrice: DeliveryValue,
      images: Images,
      category: CategoryValue,
    }
    
    if (!TitleValue || !DescriptionValue || !PriceValue ||
      !CategoryValue || !Images || !DeliveryValue) {
      setAlert('Fill all the fields', 'danger')
    } else {
      uploadProduct(variables)
      history.push('/dashboard')
    }
  }
  return (
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Upload Product
          </Typography>
          <form
            className={classes.form}
            onSubmit={(e) => onSubmit(e)}
            noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FileUpload refreshFunction={updateImages} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete='fname'
                  name='firstName'
                  variant='outlined'
                  required
                  fullWidth
                  id='firstName'
                  label='Name of the product'
                  autoFocus
                  value={TitleValue}
                  onChange={(e) => onTitleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  // defaultValue="Default Value"
                  variant="outlined"
                  onChange={(e) => onDescriptionChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.margin} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-amount">Delivery Price</InputLabel>
                  <OutlinedInput
                    id="adornment-amount"
                    value={DeliveryValue}
                    onChange={(e) => onDeliveryChange(e)}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    labelWidth={120}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.margin} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    value={PriceValue}
                    onChange={(e) => onPriceChange(e)}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    labelWidth={60}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Category"
                  value={CategoryValue}
                  onChange={(e) => onCategorySelectChange(e)}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select category"
                  variant="outlined"
                >
                  {Categories.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.value}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              Upload
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
        <Fab color='primary' className={classes.floatButton} aria-label='add'>
          <Link className={classes.linkTag} to='/dashboard'>
            <DashboardIcon />
          </Link>
        </Fab>
      </Container>
  );
}

UploadProduct.propTypes = {
  setAlert: PropTypes.func.isRequired,
  uploadProduct: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { setAlert, uploadProduct }
)(UploadProduct);