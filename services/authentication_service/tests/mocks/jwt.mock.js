import { jest } from '@jest/globals';

export const mockSignAuthToken = jest.fn();

export function resetJwtMocks() {
  mockSignAuthToken.mockReset();
}