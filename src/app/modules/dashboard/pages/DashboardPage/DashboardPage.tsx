import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Skeleton } from '@mui/material';

import { selectAllGuests, fetchGuests } from 'app/redux/guests/guestsSlice';
import { StatusType } from 'app/redux/statusType';
import { RootState } from 'app/store';

import { GuestGrid, GuestFilter } from '../../components';
import { GuestFilterParams } from '../../components/GuestFilter/GuestFilter';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const status = useSelector<RootState, StatusType>(state => state.guests.status);
  const guests = useSelector(selectAllGuests);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGuests())
    }
  }, [status, dispatch]);

  const onFilterChange = (value: GuestFilterParams) => {
    console.log(value);
  }

  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      overflowY: 'auto'
    }}>
      {status === 'loading' 
        ? 
          <Box sx={{
            marginTop: '2rem',
            width: 200,
            height: 200,
          }}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Box>
        : 
          <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <GuestFilter onFilterChange={onFilterChange} />
            <GuestGrid guests={guests} />
          </Box>
      }
    </Box>
  );
}
