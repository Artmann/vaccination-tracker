import loadable from '@loadable/component';
import React, { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

const TimelineRoute = loadable(() => import('./routes/timeline'));
const ReportRoute = loadable(() => import('./routes/report'));

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
