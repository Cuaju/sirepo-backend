import { resetPrismaMocks } from '../mocks/prisma.mock.js';
import { resetHashMocks } from '../mocks/hash.mock.js';
import { resetJwtMocks } from '../mocks/jwt.mock.js';

export function resetAllUnitMocks() {
  resetPrismaMocks();
  resetHashMocks();
  resetJwtMocks();
}