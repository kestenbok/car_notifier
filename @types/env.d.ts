declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      DRIVER_ID: string;
      PLATES: string;

      TELEGRAM_API_ID: number;
      TELEGRAM_API_HASH: string;
    }
  }
}

export default {};
