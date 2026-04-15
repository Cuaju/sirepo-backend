import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function resolveFromServiceRoot(relativePath) {
  return path.resolve(__dirname, '../../', relativePath);
}

function getPrivateKey() {
  const keyPath = resolveFromServiceRoot(process.env.JWT_PRIVATE_KEY_PATH);
  return fs.readFileSync(keyPath, 'utf8');
}

export function signAuthToken(user) {
  const privateKey = getPrivateKey();

  const payload = {
    sub: user.accountId,
    username: user.username,
    usertype: user.usertype,
    active: user.active
  };

  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE
  });
}