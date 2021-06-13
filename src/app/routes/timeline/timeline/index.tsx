import { collect, Collection } from 'collect.js';
import { format, parseISO } from 'date-fns';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { Report } from '..';

interface TimelineProps {
  reports: Report[];
}

interface GroupedReport extends Report {
  key: string;
  groupName: string;
}

interface TimelineGroupProps {
  reports: GroupedReport[];
}

interface TimeLineItemProps {
  text: string;
  title: string;

  highlighted?: boolean;
}

export function Timeline({ reports }: TimelineProps): ReactElement {
  const reportsGroupedByDay = (collect(reports)
    .map((report: Report): GroupedReport => ({
      ...report,
      key: format(parseISO(report.timestamp), 'yyyy-MM-dd'),
      groupName: format(parseISO(report.timestamp), 'EEEE')
    }))
    .groupBy('key')
    .all() as unknown) as Record<string, Collection<GroupedReport>>;

  const groupKeys = Object.keys(reportsGroupedByDay).sort((a, b) => a < b ? 1 : -1);

  return (
    <div className="mb-32 -ml-3">
      <Link
        className="fixed bottom-0 right-0 mb-8 mr-8 block cursor-pointer mx-2 bg-purplish-blue text-white 6ext-center px-4 py-2 shadow-md text-sm border border-gray-300 md:hidden"
        to="/report"
      >
        Add Report
      </Link>

      {
        groupKeys.map(key => <TimelineGroup
            key={ key }
            reports={ reportsGroupedByDay[key].all() }
          />
        )
      }
    </div>
  );
}

function TimelineGroup({ reports }: TimelineGroupProps): ReactElement | null {
  if (reports.length === 0) {
    return null;
  }

  const [ firstReport ] = reports;
  const { groupName } = firstReport;
  const totalAmountOfDoses = reports.reduce((sum, report) => sum + report.numberOfDoses, 0);
  const averageAmountOfDoses = Math.floor(totalAmountOfDoses / reports.length);

  return (
    <>
      <TimeLineItem
        text={ `An average of ${ averageAmountOfDoses } doses where administered.` }
        title={ groupName }
        highlighted
      />

      { collect(reports).sortByDesc('timestamp').map((report, index) => <TimeLineItem
          key={ index }
          text={ `${ report.numberOfDoses } doses where administered.` }
          title={ format(parseISO(report.timestamp), 'yyyy/MM/dd HH:mm:ss') }
        />)
      }
    </>
  );
}

function TimeLineItem({ highlighted = false, text, title }: TimeLineItemProps): ReactElement {
  const lineColor = highlighted ? 'rgba(72, 73, 161, 0.95)' : 'rgba(72, 73, 161, 0.3)';

  return (
    <div className="flex">
      <div className="pr-8">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="30" height="100">
          <circle cx="15" cy="7" r="5" stroke={ lineColor } strokeWidth="4" fill="none" shapeRendering="geometricPrecision" />

          <line x1="15" y1="14" x2="15" y2="100" stroke="rgba(72, 73, 161, 0.3)" strokeWidth="2" />
        </svg>

      </div>

      <div>
        <div className={ `-mt-2 mb-2 ${ highlighted ? 'font-bold' : 'text-sm'}` }>
          { title }
        </div>
        <div className={ highlighted ? 'text-sm' : 'text-xs' }>
          { text }
        </div>
      </div>

    </div>
  );
}
