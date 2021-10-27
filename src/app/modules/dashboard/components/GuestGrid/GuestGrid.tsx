/* eslint-disable react/no-array-index-key */
import { Paper, Skeleton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import { Guest, PagedResponse } from 'app/api';

interface GuestGridProps {
  guests: PagedResponse<Guest>;
  loading: boolean;
}

export default function GuestGrid( { guests, loading }: GuestGridProps ) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, maxHeight: 500 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow sx={{ height: 20 }}>
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
            ? guests?.result?.map((row) => (
              <TableRow
                key={row.ip}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: 20 }}
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
  )
}