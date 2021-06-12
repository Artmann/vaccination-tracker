import { Context } from 'koa';

import { Report } from './report';

export async function reportsRoute(context: Context): Promise<void> {
  const reports = await Report.findAll();

  context.body = {
    reports
  };
}
