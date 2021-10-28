import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'app/hooks';

import { Box, Skeleton } from '@mui/material';

import { fetchGuests } from 'app/redux/guests/guestsSlice';

import { GuestGrid, GuestFilter, Doughnut } from '../../components';
import { GuestFilterParams } from '../../components/GuestFilter/GuestFilter';

/**
 * Dashboard page that shows the tracked data.
 */
export default function DashboardPage() {
  const dispatch = useDispatch();
  
  const status = useAppSelector(state => state.guests.status);
  const isFirstLoad = useAppSelector(state => state.guests.isFirstLoad);
  const chartData = useAppSelector(state => state.guests.charts);
  const guests = useAppSelector(state => state.guests.list);

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
            {status === 'succeeded' && 
              <Box sx={{ display: 'flex', height: 100 }}>
                <Doughnut title="Platforms" items={chartData.platforms} />
                <Doughnut title="Browsers" items={chartData.browsers} />
              </Box>
            }
          </Box>
      }
    </Box>
  );
}
