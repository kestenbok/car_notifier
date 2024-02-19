const Logger = {
  info: (...data: any[]) => console.log(`[INFO]: ${data}`),
  warning: (...data: any[]) => console.log(`[WARNING]: ${data}`),
  error: (...data: any[]) => console.log(`[ERROR]: ${data}`),
};

export default Logger;
