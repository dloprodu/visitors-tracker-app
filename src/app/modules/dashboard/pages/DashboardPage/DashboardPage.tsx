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
  const data = useAppSelector(state => state.guests.data);
  const query = useAppSelector(state => state.guests.queryParams);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGuests({ offset: query.offset, limit: query.limit }));
    }
  }, [status, dispatch]);

  const onFilterChange = (value: GuestFilterParams) => {
    dispatch(fetchGuests( { offset: 0, limit: query.limit, userAgent: value.userAgent, platform: value.platform } ));
  }

  const onPageChangeHandler = (newPage: number) => {
    dispatch(fetchGuests( {...query, ...{ offset: newPage }} ));
  }

  const onPerPageChangeHandler = (newPerPage: number) => {
    dispatch(fetchGuests( {...query, ...{ offset: 0, limit: newPerPage }} ));
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
            <GuestGrid
              data={data}
              loading={status === 'loading'}
              page={query.offset ?? 0}
              perPage={query.limit ?? 20}
              onPageChange={onPageChangeHandler}
              onPerPageChange={onPerPageChangeHandler}
              />
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
