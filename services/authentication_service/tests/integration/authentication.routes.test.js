import { jest } from '@jest/globals';
import request from 'supertest';
import {mockLoginWithUsernamePassword,mockLoginWithAccessToken,resetAuthenticationServiceMocks} from '../mocks/authentication.service.mock.js';

jest.unstable_mockModule('../../src/services/authentication.service.js', () => ({
  loginWithUsernamePassword: mockLoginWithUsernamePassword,
  loginWithAccessToken: mockLoginWithAccessToken
}));

const { default: app } = await import('../../src/app.js');

const VALID_LOGIN_BODY = {
  username: 'admin',
  password: 'admin123'
};

const INVALID_LOGIN_BODY = {username: 'admin'};

const EXPECTED_TOKEN = 'fake-jwt-token';

describe('authentication routes integration tests', () => {
  beforeEach(() => {
    resetAuthenticationServiceMocks();
  });

  test('POST /authentication/login should return 200 and authToken when credentials are valid', async () => {
    mockLoginWithUsernamePassword.mockResolvedValue({
      authToken: EXPECTED_TOKEN
    });

    const response = await request(app)
      .post('/authentication/login')
      .send(VALID_LOGIN_BODY);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      authToken: EXPECTED_TOKEN
    });

    expect(mockLoginWithUsernamePassword).toHaveBeenCalledWith(
      VALID_LOGIN_BODY.username,
      VALID_LOGIN_BODY.password
    );
  });

  test('POST /authentication/login should return 400 when body is invalid', async () => {
    const response = await request(app)
      .post('/authentication/login')
      .send(INVALID_LOGIN_BODY);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'password is required and must be a string'
    });

    expect(mockLoginWithUsernamePassword).not.toHaveBeenCalled();
  });

  test('POST /authentication/login should return 401 when service throws invalid credentials', async () => {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;

    mockLoginWithUsernamePassword.mockRejectedValue(error);

    const response = await request(app)
      .post('/authentication/login')
      .send(VALID_LOGIN_BODY);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: 'Invalid credentials'
    });
  });
});