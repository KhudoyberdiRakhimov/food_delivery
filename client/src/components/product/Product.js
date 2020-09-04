import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import CardMedia from '@material-ui/core/CardMedia'
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp'
import MotorcycleIcon from '@material-ui/icons/Motorcycle'
import Brightness1Icon from '@material-ui/icons/Brightness1'
import { addToCart } from '../../actions/visitor'
import CartNavbar from '../layout/CartNavbar'

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  image: {
    width: 100,
    height: 100,
  },
  img: {
    margin: 'auto',
    // display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
}));

const Product = ({
  addToCart,
  auth: { visitor },
  match
}) => {
  const classes = useStyles()
  const [Profile, setProfile] = useState([])
  const [Products, setProducts] = useState([])
  const [open, setOpen] = useState(false)
  
  useEffect(() => {
    axios.get(`/api/users/?userId=${match.params.userId}`).then((response) => {
      setProfile(response.data[0])
    })
    axios.get(`/api/product/?userId=${match.params.userId}`).then((response) => {
      setProducts(response.data)
    })
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  } 

  return (
    <Fragment>
      <CartNavbar />
      {Profile.organization && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* <div className={classes.orgImg}>Fuck</div> */}
            <OrgImg img={`http://localhost:5000/${Profile.images[0]}`} />
          </Grid>
          <Grid item lg={2} sm={3} md={3} xs={4}>
            <Avatar
              alt='Logo'
              src={`http://localhost:5000/${Profile.logos[0]}`}
              className={classes.large}
            />
          </Grid>
          <Grid item lg={4} sm={3} md={3} xs={8} style={{ display: 'flex' }}>
            <Brightness1Icon style={{ color: green[500] }} />
            <h3>{Profile.organization}</h3>
          </Grid>
          <Grid item lg={3} sm={3} md={3} xs={12} style={{ display: 'flex' }}>
            <LocationOnIcon color='primary' />
            <h3>{Profile.address}</h3>
          </Grid>
          <Grid item lg={3} sm={3} md={3} xs={12} style={{ display: 'flex' }}>
            <AccessTimeIcon color='secondary' />
            <h3>Open, Closes in 1 hour and 4 minutes</h3>
          </Grid>
        </Grid>
      )}
      <Divider />
      <List className={classes.list}>
        {Products[0] &&
          Products.map((product) => (
            <Fragment key={product._id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    className={classes.large}
                    alt='product'
                    src={`http://localhost:5000/${product.images[0]}`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={product.title}
                  secondary={product.description}
                />
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={handleClickOpen}>
                  More...
                </Button>
              </ListItem>
              <Divider />
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={`http://localhost:5000/${product.images[0]}`}
                    title='Image title'
                  />
                  <CardHeader
                    title={product.title}
                    subheader={product.description}
                  />
                  <CardActions>
                    <IconButton aria-label='add to favorites'>
                      <MotorcycleIcon />${product.deliveryPrice}
                    </IconButton>
                    <IconButton aria-label='share'>
                      <AccessTimeIcon />
                    </IconButton>
                    <IconButton
                      color='primary'
                      variant='outlined'
                      aria-label='add to cart'
                      onClick={() => addToCart(product._id, visitor._id)}>
                      <AddCircleSharpIcon />${product.price}
                    </IconButton>
                  </CardActions>
                </Card>
                {/* <DialogTitle id='alert-dialog-title'>
                  {product.title}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    {product.description}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color='primary'>
                    Disagree
                  </Button>
                  <Button onClick={handleClose} color='primary' autoFocus>
                    Agree
                  </Button>
                </DialogActions> */}
              </Dialog>
            </Fragment>
          ))}
      </List>
    </Fragment>
  );
}

Product.propTypes = {
  addToCart: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { addToCart })(Product)

const OrgImg = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.img});
  background-size: cover;
`;