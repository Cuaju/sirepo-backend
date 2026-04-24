import { jest } from '@jest/globals';

export const mockComparePassword = jest.fn();

export function resetHashMocks() {
  mockComparePassword.mockReset();
}