import URLS from '../constants/urls';
import { Result } from '../core/types/result';

type VignetteResponse = {
  vignette: {
    licensePlateNumber: string;
    country: string;
    exempt: boolean;
    vignetteNumber: string;
    vehicleClass: string;
    emissionsClass: string;
    validityDateFromFormated: string;
    validityDateFrom: string;
    validityDateToFormated: string;
    validityDateTo: string;
    issueDateFormated: string;
    issueDate: string;
    price: number;
    currency: string;
    status: string;
    vehicleClassCode: string;
    emissionsClassCode: string;
    whitelist: boolean;
    vehicleType: string;
    vehicleTypeCode: string;
    statusBoolean: boolean;
  } | null;
  ok: boolean;
  status: {
    code: number;
    message: string;
  };
};

export type Vignette = {
  active: boolean;
  expiresAt: string | null;
};

const vignetteChecker = {
  checkVignette: async function (plate: string): Promise<Result<Vignette>> {
    try {
      const response = await fetch(URLS.VIGNETTE + plate);

      const { vignette }: VignetteResponse = await response.json();

      return {
        data: {
          active: !!vignette?.statusBoolean,
          expiresAt: vignette?.validityDateTo ?? null,
        },
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

export default vignetteChecker;
