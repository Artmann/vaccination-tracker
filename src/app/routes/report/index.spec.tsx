jest.mock('./use-create-report');

import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

import ReportRoute from '.';
import { useCreateReport } from './use-create-report';

describe('Report', () => {

  it('creates a report', () => {
    const mutate = jest.fn();

    (useCreateReport as jest.Mock).mockReturnValue({
      isLoading: false,
      mutate
    });

    render(
      <MemoryRouter>
        <ReportRoute />
      </MemoryRouter>
    );

    fireEvent.change(
      screen.getByLabelText('When was the doses administered?'),
      { target: { value: '2021-05-13 14:15:00' } }
    );

    userEvent.type(
      screen.getByLabelText('How many doses where administered?'),
      '250'
    );

    userEvent.click(screen.getByText('Save Report'));

    expect(mutate).toHaveBeenCalledWith({
      numberOfDoses: 10000,
      timestamp: 1620908100000
    });

  });

});
