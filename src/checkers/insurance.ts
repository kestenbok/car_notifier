import puppeteer from 'puppeteer';

import URLS from '../constants/urls';
import { Result } from '../core/types/result';

export type Insurance = ActiveInsurance | InactiveInsurance;

type ActiveInsurance = {
  active: true;
  expiresAt: string;
  insurer: string;
};

type InactiveInsurance = {
  active: false;
  expiresAt: null;
  insurer: null;
};

const insuranceChecker = {
  checkInsurance: async function (plate: string): Promise<Result<Insurance>> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URLS.INSURANCE);
    await page.type('input[name="dkn"]', plate);
    await page.click('.button_submit');
    await page.waitForNavigation();

    const { insurer, endDate } = await page.evaluate(() => {
      const results = document.querySelectorAll('table.success-results tr')[1];

      if (!results) {
        return {
          insurer: null,
          endDate: null,
        };
      }

      const [insurer, _, endDate] = Array.from(results.children).map(
        (element) => element.textContent,
      );

      return {
        insurer,
        endDate: endDate ?? '',
      };
    });

    await browser.close();

    if (!insurer) {
      return {
        data: {
          active: false,
          expiresAt: null,
          insurer: null,
        },
        error: null,
      };
    }

    return {
      data: {
        active: true,
        expiresAt: endDate,
        insurer,
      },
      error: null,
    };
  },
};

export default insuranceChecker;
