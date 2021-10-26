import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';

import { selectAllGuests, fetchGuests } from 'app/redux/guests/guestsSlice';
import { StatusType } from 'app/redux/statusType';

import { RootState } from 'app/store';

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
        ? <div>Loading ... </div> 
        : <div>{ guests.length }</div>
      }
    </Box>
  );
}
