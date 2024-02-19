export type Result<T> = Success<T> | Failure;

type Success<T> = {
  data: T;
  error: null;
};

type Failure = {
  data: null;
  error: Error;
};
