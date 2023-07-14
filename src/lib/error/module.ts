import { KNOWN_ERRORS } from './constants';

export const raiseKnownError = (errorType: keyof typeof KNOWN_ERRORS) => ({
  isKnown: true,
  ...KNOWN_ERRORS[errorType],
});
