export function validateLoginBody(body) {
  const { username, password } = body;

  if (!username || typeof username !== 'string') {
    return 'username is required and must be a string';
  }

  if (!password || typeof password !== 'string') {
    return 'password is required and must be a string';
  }

  return null;
}

export function validateTokenLoginBody(body) {
  const { accessToken } = body;

  if (!accessToken || typeof accessToken !== 'string') {
    return 'accessToken is required and must be a string';
  }

  return null;
}