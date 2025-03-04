import {Messages} from 'reduxFeatures/settings/types';

export const createEditError = (
  err: unknown,
  setError: (message: string) => void,
) => {
  const typedError = err as {
    status?: number;
  };
  if (typedError.status === 422) {
    setError(Messages.ChangesNotSaved);
  } else {
    setError(Messages.ErrorOccurred);
  }
};
