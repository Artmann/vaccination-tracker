import React, { ReactElement } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { ReportRoute, TimelineRoute } from './routes';

const queryClient = new QueryClient();

export default function App(): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
