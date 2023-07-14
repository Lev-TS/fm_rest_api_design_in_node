export const KNOWN_ERRORS = {
  INVALID_BODY: { status: 400, message: 'Invalid request body' },
  USER_EXISTS: { status: 409, message: 'This username is already taken' },
  MISSING_TOKEN: { status: 401, message: 'Token is missing' },
  INVALID_TOKEN: { status: 401, message: 'Invalid is missing' },
} as const;
