import { CronJob } from 'cron';

import VehicleService from './services/vehicle';
import Logger from './core/logger/logger';

function configureJob(service: VehicleService) {
  const job = new CronJob(
    '@daily',
    () => service.update(),
    () => Logger.info('Refreshed vehicle information'),
    null,
    'Europe/Sofia',
  );

  return job;
}

export default configureJob;
