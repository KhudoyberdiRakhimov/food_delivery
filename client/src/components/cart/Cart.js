import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { getCartItems, removeCartItem } from '../../actions/visitor'
import CartNavbar from '../layout/CartNavbar'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  cardContainer: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}))
const Cart = ({
  visitor,
  history,
  getCartItems,
  removeCartItem
}) => {

  const classes = useStyles()
  const [Total, setTotal] = useState(0)
  const [ShowTotal, setShowTotal] = useState(false)

  useEffect(() => {
    let cartItems = [];
    if (visitor.userData && visitor.userData.cart) {
      if (visitor.userData.cart.length > 0) {
        visitor.userData.cart.forEach(item => {
          cartItems.push(item.id)
        });
        getCartItems(cartItems, visitor.userData.cart)
      }
    }
  }, [visitor.userData]) 

  useEffect(() => {
    if (visitor.cartDetail) {
      calculateTotal(visitor.cartDetail)
    }
    }, [visitor.cartDetail])

  const calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map(item => {
      total += parseInt(item.price, 10) * item.quantity + item.deliveryPrice
    });

    setTotal(total)
    setShowTotal(true)
  }

  const removeFromCart = (productId)  => {
    removeCartItem(productId)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <CartNavbar />
      <div className={classes.cardContainer}>
        {visitor.cartDetail ? visitor.cartDetail.map((product) => (
          <Paper className={classes.paper} key={product._id}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={`http://localhost:5000/${product.images[0]}`} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {product.description}
                    </Typography>
                    {/* <Typography variant="body2" color="textSecondary">
                      {product.price}
                    </Typography> */}
                  </Grid>
                  <Grid item xs container direction="row" spacing={2}>
                    <Grid item>
                      Price: ${product.price}
                    </Grid>
                    <Grid item>
                      Qty: {product.quantity}
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() =>removeFromCart(product._id)}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">${product.quantity*product.price+product.deliveryPrice}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        )) : <h1>The cart is Emty</h1>}
        {ShowTotal &&
          <Paper className={classes.paper}>
            <Typography color='textPrimary' >Total: ${Total}</Typography>
          </Paper>
        }
      </div>
    </div>
  )
}

Cart.propTypes = {
  getCartItems: PropTypes.func.isRequired,
  removeCartItem: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  visitor: state.visitor
})

export default connect(mapStateToProps, { getCartItems, removeCartItem })(Cart)