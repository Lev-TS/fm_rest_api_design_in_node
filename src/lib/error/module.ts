import { KNOWN_ERRORS } from './constants';

export const raiseKnownError = (errorType: keyof typeof KNOWN_ERRORS) => ({
  isKnown: true,
  body: KNOWN_ERRORS[errorType],
});

export const raiseUnknownError = (error: unknown) => ({
  isKnown: false,
  body: error,
});
