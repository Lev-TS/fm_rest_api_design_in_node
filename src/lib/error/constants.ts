export const KNOWN_ERRORS = {
  INVALID_BODY: { status: 400, message: 'Invalid request body' },
  MISSING_TOKEN: { status: 401, message: 'Token is missing' },
  INVALID_TOKEN: { status: 401, message: 'Invalid token' },
  INVALID_PASSWORD: { status: 401, message: 'Invalid password' },
  USER_NOT_FOUND: { status: 404, message: 'User not found' },
  USER_EXISTS: { status: 409, message: 'This username is already taken' },
  PRODUCT_NOT_FOUND: { status: 404, message: 'Product not found' },
  UPDATE_NOT_FOUND: { status: 404, message: 'Update not found' },
} as const;
