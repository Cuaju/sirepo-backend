import { jest } from '@jest/globals';

export const mockLoginWithUsernamePassword = jest.fn();
export const mockLoginWithAccessToken = jest.fn();

export function resetAuthenticationServiceMocks() {
  mockLoginWithUsernamePassword.mockReset();
  mockLoginWithAccessToken.mockReset();
}