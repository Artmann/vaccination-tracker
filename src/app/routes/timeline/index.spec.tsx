import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { parse } from 'date-fns';
import React from 'react';
import { MemoryRouter } from 'react-router';

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
      <MemoryRouter>
        <TimelineRoute />
      </MemoryRouter>
    );
  });

  it('shows a timeline', () => {
    (useReports as jest.Mock).mockReturnValue({
      data: {
        reports: [
          {
            id: 45,
            numberOfDoses: 10,
            timestamp: '2021-06-10T12:00:00.000Z'
          },
          {
            id: 65,
            numberOfDoses: 20,
            timestamp: '2021-06-10T17:00:00.000Z'
          },
          {
            id: 77,
            numberOfDoses: 30,
            timestamp: '2021-06-11T13:00:00.000Z'
          }
        ]
      },
      error: undefined,
      isLoading: false
    });

    render(
      <MemoryRouter>
        <TimelineRoute />
      </MemoryRouter>
    );

    expect(screen.getByText('Thursday')).toBeInTheDocument();
    expect(screen.getByText('An average of 15 doses where administered.')).toBeInTheDocument();
    expect(screen.getByText('10 doses where administered.')).toBeInTheDocument();
    expect(screen.getByText('20 doses where administered.')).toBeInTheDocument();

    expect(screen.getByText('Friday')).toBeInTheDocument();
    expect(screen.getByText('An average of 30 doses where administered.')).toBeInTheDocument();
    expect(screen.getByText('30 doses where administered.')).toBeInTheDocument();
  });

  it('shows an empty state when there are no reports', () => {
    (useReports as jest.Mock).mockReturnValue({
      data: {
        reports: []
      },
      error: undefined,
      isLoading: false
    });

    render(
      <MemoryRouter>
        <TimelineRoute />
      </MemoryRouter>
    );

    expect(screen.getByText('Welcome to the Vaccination Tracker. 😊')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent('Add a Report');
  });

});
