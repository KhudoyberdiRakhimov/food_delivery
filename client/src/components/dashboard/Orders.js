import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Title from './Title';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrdersUser, productDelivered, getDeliveredOrders, removeOrder } from '../../actions/user';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Orders = ({
  auth,
  getOrdersUser,
  user,
  productDelivered,
  getDeliveredOrders,
  removeOrder
}) => {
  const classes = useStyles()  
  useEffect(() => {
    getOrdersUser()
  }, [getOrdersUser])
  useEffect(() => {
    getDeliveredOrders()
  }, [getDeliveredOrders])
  
  const handleDelivered = (productId) => {
    console.log(`ProductID: ${productId}`)
    productDelivered(productId)
    getDeliveredOrders()
  }

  const handleRemove = (productId) => {
    console.log(`ProductID: ${productId}`)
    removeOrder(productId)
  }

  return (
    <React.Fragment>
      <Title>Orders</Title>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Recent Orders</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Payment</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.orders && user.orders.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>${row.amount}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        onClick={() => handleDelivered(row._id)}
                      >
                        Delivered
                  </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Delivered Orders</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.delivereds && user.delivereds.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>${row.amount}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      component="span"
                      onClick={() => handleRemove(row._id)}
                    >
                      Remove
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}

Orders.propTypes = {
  auth: PropTypes.object.isRequired,
  getOrdersUser: PropTypes.func.isRequired,
  productDelivered: PropTypes.func.isRequired,
  removeOrder: PropTypes.func.isRequired,
  getDeliveredOrders: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user
});

export default connect(mapStateToProps, {
  getOrdersUser, productDelivered, removeOrder, getDeliveredOrders
})(Orders);