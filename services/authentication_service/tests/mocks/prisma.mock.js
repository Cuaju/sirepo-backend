import { jest } from '@jest/globals';

export const mockFindUnique = jest.fn();

export const prismaMock = {
  user: {
    findUnique: mockFindUnique
  }
};

export function resetPrismaMocks() {
  mockFindUnique.mockReset();
}