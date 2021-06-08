import { parse } from 'date-fns';
import { Context } from 'koa';

export async function reportsRoute(context: Context): Promise<void> {
  context.body = {
    reports: [
      {
        id: 1,
        numberOfDoses: 88,
        timestamp: parse('2021-06-04 8:34:11', 'yyyy-MM-dd HH:mm:ss', new Date()).getTime()
      },
      {
        id: 2,
        numberOfDoses: 122,
        timestamp: parse('2021-06-05 14:54:32', 'yyyy-MM-dd HH:mm:ss', new Date()).getTime()
      },
      {
        id: 3,
        numberOfDoses: 56,
        timestamp: parse('2021-06-07 16:12:43', 'yyyy-MM-dd HH:mm:ss', new Date()).getTime()
      },
      {
        id: 4,
        numberOfDoses: 67,
        timestamp: parse('2021-06-07 12:43:44', 'yyyy-MM-dd HH:mm:ss', new Date()).getTime()
      },
      {
        id: 5,
        numberOfDoses: 30,
        timestamp: parse('2021-06-08 08:53:23', 'yyyy-MM-dd HH:mm:ss', new Date()).getTime()
      },
      {
        id: 6,
        numberOfDoses: 128,
        timestamp: parse('2021-06-08 11:11:34', 'yyyy-MM-dd HH:mm:ss', new Date()).getTime()
      }
    ]
  };
}
