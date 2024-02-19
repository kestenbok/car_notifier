import 'dotenv/config';

import Logger from './core/logger/logger';
import VehicleService from './services/vehicle';
import configureServer from './server';
import configureJob from './job';

async function main() {
  const PORT = process.env.SERVER_PORT;
  const HOST = process.env.SERVER_HOST;

  const PLATES = process.env.PLATES.split(',');
  const DRIVER_ID = process.env.DRIVER_ID;

  const service = new VehicleService(PLATES, DRIVER_ID);
  await service.initialize();

  const server = configureServer(service);
  const job = configureJob(service);

  try {
    job.start();

    server.listen({ port: PORT, host: HOST }, () => {
      Logger.info(`Server ready to accept connections on ${HOST}:${PORT}`);
    });
  } catch (error) {
    job.stop();
    console.error(error);
    process.exit(1);
  }
}

main();
