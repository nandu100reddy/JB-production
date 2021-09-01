import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Row } from 'react-lightning-design-system/module/scripts/Grid';
import { Image } from 'react-bootstrap';
import './ObjectItems.css';
import {
  Button,
  Col,
  Form,
  Grid,
  PageHeader,
  PageHeaderHeading,
} from 'react-lightning-design-system';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function createCustomData(name, calories, fat, api, carbs, protein) {
  return { name, calories, fat, api, carbs, protein };
}

const rows = [
  createCustomData(
    'Edit | Delete',
    'Accounts',
    'NA',
    'Standard',
    '',
    'NA',
    'NA'
  ),
  createCustomData(
    'Edit | Delete',
    'Billing',
    'Custom Object 1',
    'Custom',
    '',
    'Jiten Miglani 11/02/2021',
    'NA'
  ),
  createCustomData(
    'Edit | Delete',
    'Contacts',
    'Accounts',
    'Standard',
    '',
    'NA',
    ''
  ),
  createCustomData('Edit | Delete', 'Leads', '', 'Custom', '', '', ''),
  createCustomData('Edit | Delete', 'Opportunity', '', 'Standard', '', '', ''),
  createCustomData(
    'Edit | Delete',
    'Custom Object 1',
    '',
    'Custom',
    '',
    '',
    ''
  ),
  createCustomData(
    'Edit | Delete',
    'Custom Object 2',
    '',
    'Standard',
    '',
    '',
    ''
  ),
];

const ObjectItems = () => {
  const classes = useStyles();

  return (
    <div>
      <Row cols={10} className="HeaderSetupRow" display="flex">
        <Col cols={10}>
          <div className={classes.root}>
            <div className="main">
              <PageHeader>
                <PageHeaderHeading
                  figure={
                    <Image category="standard" icon="user" size="large" />
                  }
                  leftActions={
                    <Button className="BorderButton FLR" type="neutral">
                      Create New
                      </Button>
                  }
                  title="Veiw Custom Object : Billing"
                  legend="View Billings"
                />
              </PageHeader>

              <Row cols={12} className="" display="flex">
                <Col cols={12} className="MainViewRecord">
                  <Form
                    className="NewRecord"
                    onSubmit={function noRefCheck() { }}
                    type=""
                  >
                    <Col cols={12} className="FormPartHeadcol">
                      <h3 className="FormPartHead">Standard Fields</h3>
                    </Col>
                    <Grid vertical>
                      <Row cols={12}>
                        <Col cols={12}>
                          <TableContainer component={Paper}>
                            <Table
                              className={classes.table}
                              aria-label="simple table"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell>Action</TableCell>
                                  <TableCell align="right">
                                    Display Name
                                    </TableCell>
                                  <TableCell align="right">
                                    Parent Object
                                    </TableCell>
                                  <TableCell align="right">
                                    Object Type
                                    </TableCell>
                                  <TableCell align="right">
                                    Description
                                    </TableCell>
                                  <TableCell align="right">
                                    Created By
                                    </TableCell>
                                  <TableCell align="right">
                                    Last Modified By
                                    </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rows.map((row) => (
                                  <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                      <a>{'Edit | Delete'}</a>
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.calories}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.fat}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.api}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.carbs}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.protein}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.protein}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Col>
                      </Row>
                    </Grid>
                  </Form>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

ObjectItems.propTypes = {
};

export default ObjectItems;
