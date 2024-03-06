import 'dotenv/config';
import { createTransport } from 'nodemailer';

import VehicleService from './services/vehicle';

async function main() {
  // const PLATES = process.env.PLATES.split(',');
  // const DRIVER_ID = process.env.DRIVER_ID;

  // const service = new VehicleService(PLATES, DRIVER_ID);
  // const vehicleInfo = await service.fetch();

  const mailer = createTransport({
    sendmail: true,
  });

  const { envelope, messageId } = await mailer.sendMail({
    to: 'kristiyan.nedyalkov98@gmail.com',
    from: 'car-notifier@mail.com',
    subject: 'Car Notifier Daily Update',
    text: 'Hopefully you get this :)',
  });

  console.log(envelope, messageId);
}

main();
