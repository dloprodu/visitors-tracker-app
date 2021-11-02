import React, { Component, Suspense } from 'react';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { faLowVision } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './App.css';

const RegisterPage = React.lazy(() => import('./modules/register'));
const DashboardPage = React.lazy(() => import('./modules/dashboard'));

type Props = Record<string, any>;

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component<Props> {

  render() {
    return (
      <Router>
        <Container maxWidth="lg" sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <AppBar data-testid="main-header" color="secondary" position="static"  >
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit" component="div">
                <FontAwesomeIcon icon={faLowVision} /> Visitors Tracker
              </Typography>
            </Toolbar>
          </AppBar>

          <Box sx={{
            position: 'relative',
            flexGrow: 1,
            overflow: 'hidden',
            background: 'whitesmoke'
          }}>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" component={RegisterPage}/>
                <Route path="/visits" component={DashboardPage}/>
              </Switch>
            </Suspense>
          </Box>
        </Container>
      </Router>
    );
  }
}
