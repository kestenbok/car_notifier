import URLS from '../constants/urls';
import { Result } from '../core/types/result';

export type Fine = {
  initialAmount: number;
  discount: number;
  finalAmount: number;
  expirationDate: string;
  obligationDate: string;
};

type FinesResponse = {
  obligationsData: {
    unitGroup: number;
    errorNoDataFound: boolean;
    errorReadingData: boolean;
    obligations: Obligation[];
  }[];
};

type Obligation = {
  status: number;
  amount: number;
  discountAmount: number;
  bankName: string;
  bic: string;
  iban: string;
  paymentReason: string;
  pepCin: string;
  expirationDate: string;
  obligationDate: string;
  obligationIdentifier: string;
  type: number;
  serviceID: number;
  additionalData: AdditionalData;
  andSourceId: number;
};

type AdditionalData = {
  discount: string;
  documentType: string;
  documentSeries: string;
  documentNumber: string;
  documentIdentifier: string;
  amount: string;
  issueDate: string;
  obligedPersonIdent: string;
  obligedPersonIdentType: string;
  vehicleNumber: string;
  breachDate: string;
  breachOfOrder: string;
};

const fineChecker = {
  checkFines: async function (
    plate: string,
    driverIdentityNumber: string,
  ): Promise<Result<Fine[]>> {
    try {
      const response = await fetch(
        URLS.FINES +
          `&obligedPersonIdent=${driverIdentityNumber}&foreignVehicleNumber=${plate}`,
      );
      const {
        // @todo: check if this is OK or not
        obligationsData: [obligationsData],
      }: FinesResponse = await response.json();

      if (obligationsData.errorNoDataFound) {
        return {
          data: [],
          error: null,
        };
      }

      return {
        data: obligationsData.obligations.map((obligation) => ({
          initialAmount: obligation.amount,
          discount: obligation.amount - obligation.discountAmount,
          finalAmount: obligation.discountAmount,
          expirationDate: obligation.expirationDate,
          obligationDate: obligation.obligationDate,
        })),
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: error,
      };
    }
  },
};

export default fineChecker;
