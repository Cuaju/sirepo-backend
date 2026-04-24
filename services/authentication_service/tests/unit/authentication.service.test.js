import { jest } from '@jest/globals';
import {prismaMock,mockFindUnique} from '../mocks/prisma.mock.js';
import {mockComparePassword} from '../mocks/hash.mock.js';
import {mockSignAuthToken} from '../mocks/jwt.mock.js';
import {activeAdminUser, inactiveAdminUser} from '../mocks/users.mock.js';
import {resetAllUnitMocks} from '../setup/unit.setup.js';

jest.unstable_mockModule('../../src/db/prisma.js', () => ({prisma: prismaMock}));
jest.unstable_mockModule('../../src/utils/hash.js', () => ({comparePassword: mockComparePassword}));
jest.unstable_mockModule('../../src/utils/jwt.js', () => ({signAuthToken: mockSignAuthToken}));

const { loginWithUsernamePassword } = await import('../../src/services/authentication.service.js');

const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'admin123';
const INVALID_PASSWORD = 'wrong-password';
const EXPECTED_TOKEN = 'fake-jwt-token';

describe('authentication.service - loginWithUsernamePassword', () => {
  beforeEach(() => {
    resetAllUnitMocks();
  });

  test('should return authToken when credentials are valid', async () => {
    mockFindUnique.mockResolvedValue(activeAdminUser);
    mockComparePassword.mockResolvedValue(true);
    mockSignAuthToken.mockReturnValue(EXPECTED_TOKEN);

    const result = await loginWithUsernamePassword(
      VALID_USERNAME,
      VALID_PASSWORD
    );

    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { username: VALID_USERNAME }
    });

    expect(mockComparePassword).toHaveBeenCalledWith(
      VALID_PASSWORD,
      activeAdminUser.password
    );

    expect(mockSignAuthToken).toHaveBeenCalledWith(activeAdminUser);

    expect(result).toEqual({
      authToken: EXPECTED_TOKEN
    });
  });

  test('should throw 401 when password is invalid', async () => {
    mockFindUnique.mockResolvedValue(activeAdminUser);
    mockComparePassword.mockResolvedValue(false);

    await expect(
      loginWithUsernamePassword(VALID_USERNAME, INVALID_PASSWORD)
    ).rejects.toMatchObject({
      message: 'Invalid credentials',
      statusCode: 401
    });

    expect(mockSignAuthToken).not.toHaveBeenCalled();
  });
  test('should throw 403 when user is inactive', async()=>{
    mockFindUnique.mockResolvedValue(inactiveAdminUser);
    mockComparePassword.mockResolvedValue(true);

    await expect(
        loginWithUsernamePassword(VALID_USERNAME, VALID_PASSWORD)
    ).rejects.toMatchObject({
        message: 'Account is inactive',
        statusCode: 403
    })

    expect(mockSignAuthToken).not.toHaveBeenCalled();
  });

  test('should throw when prisma query fails', async () => {
    mockFindUnique.mockRejectedValue(new Error('Database error'));

    await expect(
      loginWithUsernamePassword(VALID_USERNAME, VALID_PASSWORD)
    ).rejects.toThrow('Database error');

    expect(mockComparePassword).not.toHaveBeenCalled();
    expect(mockSignAuthToken).not.toHaveBeenCalled();
  });
});