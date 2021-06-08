import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { parse } from 'date-fns';
import React from 'react';

jest.mock('./use-reports');

import TimelineRoute from '.';
import { useReports } from './use-reports';

describe('Timeline Route', () => {

  it('shows a loading indicator when loading data', () => {
    (useReports as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true
    });

    render(
      <TimelineRoute />
    );
  });

  it('shows a timeline', () => {
    (useReports as jest.Mock).mockReturnValue({
      data: {
        reports: [
          {
            id: 45,
            numberOfDoses: 10,
            timestamp: parse('2021-06-10 12:00:00', 'yyyy-MM-dd HH:mm:ss', new Date()).getTime()
          },
          {
            id: 65,
            numberOfDoses: 20,
            timestamp: parse('2021-06-10 17:00:00', 'yyyy-MM-dd HH:mm:ss', new Date()).getTime()
          },
          {
            id: 77,
            numberOfDoses: 30,
            timestamp: parse('2021-06-11 13:00:00', 'yyyy-MM-dd HH:mm:ss', new Date()).getTime()
          }
        ]
      },
      error: undefined,
      isLoading: false
    });

    const { debug } = render(
      <TimelineRoute />
    );

    expect(screen.getByText('Thursday')).toBeInTheDocument();
    expect(screen.getByText('An average of 15 doses where administered.')).toBeInTheDocument();
    expect(screen.getByText('10 doses where administered.')).toBeInTheDocument();
    expect(screen.getByText('20 doses where administered.')).toBeInTheDocument();

    expect(screen.getByText('Friday')).toBeInTheDocument();
    expect(screen.getByText('An average of 30 doses where administered.')).toBeInTheDocument();
    expect(screen.getByText('30 doses where administered.')).toBeInTheDocument();
  });

});