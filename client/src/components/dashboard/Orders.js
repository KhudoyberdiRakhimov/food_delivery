import React, { useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrdersUser } from '../../actions/user';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const Orders = ({
  auth,
  getOrdersUser,
  user
}) => {
  const classes = useStyles()  
  useEffect(() => {
    getOrdersUser()
  }, [getOrdersUser])

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.orders && user.orders.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>'Binkor 37, Xosiyon'</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
      </Link>
      </div>
    </React.Fragment>
  );
}

Orders.propTypes = {
  auth: PropTypes.object.isRequired,
  getOrdersUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user
});

export default connect(mapStateToProps, { getOrdersUser })(Orders);