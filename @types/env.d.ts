declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      SERVER_PORT: number;
      SERVER_HOST: string;
      DRIVER_ID: string;
      PLATES: string;
    }
  }
}

export default {};
