import React, { ReactElement } from 'react';

import { Page } from '../../components/page';
import { Timeline } from './timeline';
import { useReports } from './use-reports';

export interface Report {
  id: number,
  locationId: number,
  numberOfDoses: number,
  timestamp: number
};

interface ReportsResponse {
  reports: Report[];
}

export default function TimelineRoute(): ReactElement {
  const { data, error, isLoading } = useReports<ReportsResponse>();

  if (isLoading) {
    return (
      <div>
        Loading Data
      </div>
    );
  }

  if (!data || error) {
    return (
      <div>
        Failed to load data.
      </div>
    );
  }

  return (
    <Page
      headerText="Some random text that describes the page."
      title="Vaccination Report"
    >
      <Timeline reports={ data.reports } />
    </Page>
  );
}
