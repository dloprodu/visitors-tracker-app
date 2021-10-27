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
  const isFirstLoad = useSelector<RootState, boolean>(state => state.guests.isFirstLoad);
  const guests = useSelector(selectAllGuests);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGuests({ offset: 0, limit: 20 }));
    }
  }, [status, dispatch]);

  const onFilterChange = (value: GuestFilterParams) => {
    dispatch(fetchGuests( { offset: 0, limit: 20, userAgent: value.userAgent, platform: value.platform } ));
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
      {status === 'loading' && isFirstLoad
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
            <GuestGrid guests={guests} loading={status === 'loading'} />
          </Box>
      }
    </Box>
  );
}
