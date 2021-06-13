import React, { ReactElement } from 'react';
import { useHistory } from 'react-router';

import { Page } from '../../components/page';
import { Form } from './form';
import { useCreateReport } from './use-create-report';

export default function ReportRoute(): ReactElement {
  const history = useHistory();

  const { isLoading, mutate } = useCreateReport({
    onSuccess: () => {
      history.push('/');
    }
  });

  const submitHandler = (numberOfDoses: number, dateTime: Date): void => {
    const report = {
      numberOfDoses: numberOfDoses,
      timestamp: dateTime.getTime()
    };

    mutate(report);
  };

  return (
    <Page
      headerText="Report how many doses where administered."
      title="Create Report"
    >
      <div>
        <Form
          isSubmitting={ isLoading }
          onSubmit={ submitHandler }
        />
      </div>
    </Page>
  );
}
