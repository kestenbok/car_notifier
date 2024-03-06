import vignetteChecker, { Vignette } from '../checkers/vignette';
import fineChecker, { Fine } from '../checkers/fines';
import insuranceChecker, { Insurance } from '../checkers/insurance';

type VehicleInformation = {
  plate: string;
  fines: Fine[];
  vignette: Vignette;
  insurance: Insurance;
};

class VehicleService {
  private plates: string[];
  private driverID: string;

  constructor(plates: string[], driverID: string) {
    this.plates = plates;
    this.driverID = driverID;
  }

  async fetch(): Promise<VehicleInformation[]> {
    const vehicles: VehicleInformation[] = [];

    for (const plate of this.plates) {
      const vignette = await vignetteChecker.checkVignette(plate);
      const fines = await fineChecker.checkFines(plate, this.driverID);
      const insurance = await insuranceChecker.checkInsurance(plate);

      /**
       * @todo: Could use some actual error handling here
       * Perhaps these could be collected and returned as data
       * so that notifications may be prompted from them
       */
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
}

export default VehicleService;
