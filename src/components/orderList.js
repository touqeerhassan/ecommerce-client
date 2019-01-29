import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

const ORDER_QUERY = gql`
  query OrderQuery {
    orders {
      id
      customerName
      customerEmail
      customerAddress
    }
  }
`;

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function orderList(props) {
  const { classes } = props;

  return (
    <Fragment>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell align="right">Customer Email</TableCell>
              <TableCell align="right">Customer Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            <Query query={ORDER_QUERY}>
              {
                ({ loading, error, data }) => {
                  if (loading) return <Fragment></Fragment>
                  if (error) console.log(error);

                  return <Fragment>
                    {
                      data.orders.map(row => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            <Link to={`/admin/order/${row.id}`}>{row.customerName}</Link>
                          </TableCell>
                          <TableCell align="right">{row.customerEmail}</TableCell>
                          <TableCell align="right">{row.customerAddress}</TableCell>
                        </TableRow>
                      ))
                    }
                  </Fragment>
                }
              }
            </Query>

          </TableBody>
        </Table>
      </Paper>
    </Fragment>
  );
}

orderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(orderList);
