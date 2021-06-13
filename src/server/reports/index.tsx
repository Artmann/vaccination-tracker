import { Context } from 'koa';

import { Report } from './report';

export async function reportsRoute(context: Context): Promise<void> {
  const reports = await Report.findAll();

  context.body = {
    reports
  };
}

export async function createReportRoute(context: Context): Promise<void> {
  const { numberOfDoses, timestamp } = context.request.body;

  if (!numberOfDoses) {
    context.throw(400, 'numberOfDoses is required.');
  }

  if (!timestamp) {
    context.throw(400, 'timestamp is required.');
  }

  const report = await Report.create({
    numberOfDoses,
    timestamp
  });

  context.body = report;
};
