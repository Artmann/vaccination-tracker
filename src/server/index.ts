import app from './app';
import { sequelize } from './database';

(async function(): Promise<void> {
  const port = process.env.PORT || '3000';

  await sequelize.sync();

  app.listen(port, () => {
    console.log(`Listening on port ${ port }.`);
  });
})();
