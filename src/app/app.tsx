import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { ReportRoute, TimelineRoute } from './routes';

export default function App(): ReactElement {
  return (
    <Router>
      <Switch>
          <Route path="/" exact>
            <TimelineRoute />
          </Route>

          <Route path="/report">
            <ReportRoute />
          </Route>
      </Switch>
    </Router>
  );
}
