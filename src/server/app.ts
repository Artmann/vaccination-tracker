import { promises as fs } from 'fs';
import Koa, { Context } from 'koa';
import koaBody  from 'koa-body';
import koaLogger from 'koa-logger';
import mount from 'koa-mount';
import Router from 'koa-router';
import serve from 'koa-static';
import { join } from 'path';

import { createReportRoute, reportsRoute } from './reports';

const app = new Koa();
const router = new Router();

const staticsPath = process.env['NODE_ENV'] === 'production'
  ? join(__dirname, '..', 'statics')
  : join(__dirname, '..', 'dist', 'statics')

const statics = serve(staticsPath);

router.get('/api/reports', reportsRoute);
router.post('/api/reports', createReportRoute);

router.get('/*', async function(context: Context) {
  const template = await fs.readFile(join(staticsPath, 'index.html'),  'utf-8');

  context.body = template;
});

app
  .use(koaBody())
  .use(mount('/statics', statics))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(koaLogger());

export default app;
