import React, { ReactElement } from 'react';

import { Page } from '../../components/page';
import { EmptyState } from './empty-state';
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

  if (data.reports.length === 0) {
    return (
      <Page
        headerText="Stay up to date with the latest reports."
        title="Vaccination Report"
      >
        <EmptyState />
      </Page>
    );
  }

  return (
    <Page
      headerText="Stay up to date with the latest reports."
      title="Vaccination Report"
    >
      <Timeline reports={ data.reports } />
    </Page>
  );
}
