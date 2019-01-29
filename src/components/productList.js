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

const PRODUCT_QUERY = gql`
  query ProductQuery {
    products {
      id
      name
      image
      price
      color
      brand
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

function productList(props) {
  const { classes } = props;

  return (
    <Fragment>
      <h1>Product List</h1>
      <Link to={`product/add`} className="btn btn-primary float-right">Add Product</Link>
      <br />
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Color</TableCell>
              <TableCell align="right">Brand</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            <Query query={PRODUCT_QUERY}>
              {
                ({ loading, error, data }) => {
                  if (loading) return <Fragment></Fragment>
                  if (error) console.log(error);

                  return <Fragment>
                    {
                      data.products.map(row => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.price}</TableCell>
                          <TableCell align="right">{row.color}</TableCell>
                          <TableCell align="right">{row.brand}</TableCell>
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

productList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(productList);
