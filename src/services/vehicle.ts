import { readFile, writeFile } from 'fs/promises';

import vignetteChecker from '../checkers/vignette';
import fineChecker from '../checkers/fines';
import insuranceChecker from '../checkers/insurance';
import Logger from 'src/core/logger/logger';

class VehicleService {
  private plates: string[];
  private driverID: string;

  private filePath: string;

  constructor(plates: string[], driverID: string) {
    this.plates = plates;
    this.driverID = driverID;
    this.filePath = process.cwd() + '/data/info.json';
  }

  async initialize() {
    const content = await this.read();

    if (!content) {
      Logger.info('Fetching initial vehicle information. This may take a while...');
      await this.update();
      Logger.info('Finished fetching initial vehicle information.');
    }
  }

  async get(): ReturnType<typeof this.fetch> {
    const content = await this.read();

    if (content) return content;

    const newContent = await this.fetch();
    this.store(newContent);

    return newContent;
  }

  async update() {
    const vehicles = await this.fetch();

    await this.store(vehicles);
  }

  private async read() {
    try {
      const content = await readFile(this.filePath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      return null;
    }
  }

  private async fetch() {
    const vehicles = [];

    for (const plate of this.plates) {
      const vignette = await vignetteChecker.checkVignette(plate);
      const fines = await fineChecker.checkFines(plate, this.driverID);
      const insurance = await insuranceChecker.checkInsurance(plate);

      if (vignette.error) throw vignette.error;
      if (fines.error) throw fines.error;
      if (insurance.error) throw insurance.error;

      vehicles.push({
        plate,
        fines: fines.data,
        vignette: vignette.data,
        insurance: insurance.data,
      });
    }

    return vehicles;
  }

  private async store(info: Awaited<ReturnType<typeof this.fetch>>) {
    await writeFile(this.filePath, JSON.stringify(info, null, 2));
  }
}

export default VehicleService;
