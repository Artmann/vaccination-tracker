import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { Page } from '../../components/page';
import { EmptyState } from './empty-state';
import { Timeline } from './timeline';
import { useReports } from './use-reports';

export interface Report {
  id: number,
  locationId: number,
  numberOfDoses: number,
  timestamp: string
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

  const addReportButton = (
    <div className="hidden md:block">
      <Link
        className="block cursor-pointer mx-2 bg-white text-center px-6 py-2 shadow-md text-sm"
        to="/report"
      >
        Add Report
      </Link>
    </div>
  );

  return (
    <Page
      actions={ addReportButton }
      headerText="Stay up to date with the latest reports."
      title="Vaccination Report"
    >
      <Timeline reports={ data.reports } />
    </Page>
  );
}
