/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React from 'react';

import {
  Paper,
  Skeleton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination
} from '@mui/material';

import { Guest, PagedResponse } from 'app/api';

interface GuestGridProps {
  data: PagedResponse<Guest>;
  page: number;
  perPage: number;
  loading: boolean;
  onPageChange: (value: number) => void,
  onPerPageChange: (value: number) => void
}

/**
 * Guest grid component.
 */
export default function GuestGrid( {
  data,
  loading,
  page = 0,
  perPage = 20,
  onPageChange = () => {},
  onPerPageChange = () => {}
}: GuestGridProps ) {

  // eslint-disable-next-line no-unused-vars
  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  // eslint-disable-next-line no-unused-vars
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onPerPageChange(parseInt(event.target.value, 10));
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 400 }} component={Paper}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Guest IP</TableCell>
              <TableCell align="right">IP Type</TableCell>
              <TableCell align="right">Platform&nbsp;</TableCell>
              <TableCell align="right">Browser&nbsp;</TableCell>
              <TableCell align="right">Region&nbsp;</TableCell>
              <TableCell align="right">Country&nbsp;</TableCell>
              <TableCell align="right">Visits&nbsp;</TableCell>
              <TableCell align="right">Last visit&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading 
              ? data?.result?.map((row) => (
                <TableRow
                  key={row.ip}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.ip}
                  </TableCell>
                  <TableCell align="right">{row.ipType}</TableCell>
                  <TableCell align="right">{row.platform}</TableCell>
                  <TableCell align="right">{row.userAgent}</TableCell>
                  <TableCell align="right">{row.regionName}</TableCell>
                  <TableCell align="right">{row.countryName}</TableCell>
                  <TableCell align="right">{row.visits}</TableCell>
                  <TableCell align="right">{ 
                    new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit"
                    }).format( new Date(row.lastVisit || '') )}
                  </TableCell>
                </TableRow>
              ))
              : new Array(4).fill('').map((_, index) =>
                <TableRow key={index}>
                  <TableCell><Skeleton /></TableCell>                
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        component="div"
        count={data.total}
        rowsPerPage={perPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}