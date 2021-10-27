import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Skeleton } from '@mui/material';

import { selectAllGuests, fetchGuests } from 'app/redux/guests/guestsSlice';
import { StatusType } from 'app/redux/statusType';
import { RootState } from 'app/store';

import { GuestGrid, GuestFilter } from '../../components';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const status = useSelector<RootState, StatusType>(state => state.guests.status);
  const guests = useSelector(selectAllGuests);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGuests())
    }
  }, [status, dispatch]);

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
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        : 
          <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <GuestFilter />
            <GuestGrid guests={guests} />
          </Box>
      }
    </Box>
  );
}
