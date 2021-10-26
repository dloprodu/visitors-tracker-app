import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Alert, Box, Button, Card, CardContent, CardActions, Typography, Skeleton } from '@mui/material';

import { registerGuest, selectGuest } from 'app/redux/register/registerSlice';
import { StatusType } from 'app/redux/statusType';

import { RootState } from 'app/store';
import { useAppSelector } from 'app/hooks';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const status = useSelector<RootState, StatusType>(state => state.register.status);
  const guest = useSelector(selectGuest);
  const error = useAppSelector(state => state.register.errorMessage);

  const history = useHistory();
  const onClick = () => history.push('/visits');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(registerGuest())
    }
  }, [status, dispatch]);

  const card = (
    <>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Your Data
        </Typography>
        <Typography variant="h5" component="div">
          IP: {guest?.ip}
        </Typography>
        <Typography variant="h5" component="div">
          Type: {guest?.ipType}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Number of visits: {guest?.visits}
        </Typography>
        <Typography variant="body2">
          {guest?.platform} - {guest?.userAgent}
          <br />
          {guest?.regionName}
          <br />
          {guest?.countryName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onClick}>Show Visits</Button>
      </CardActions>
    </>
  );

  return (
    <>
      <Box sx={{
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'auto'
      }}>
        <Box sx={{
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {(status === 'idle' || status === 'loading')
            && <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
          }
          {status === 'failed'
            && <Alert severity="error">{error}</Alert>}
          {status === 'succeeded'
            && <Card variant="outlined">{card}</Card>}
        </Box>
      </Box>
    </>
  );
}