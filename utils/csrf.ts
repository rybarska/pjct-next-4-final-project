import Tokens from 'csrf';

const tokens = new Tokens();

export function createCsrfSecret() {
  // creates a new secret for the session
  return tokens.secretSync();
}

export function createTokenFromSecret(secret: string) {
  // creates a new token from the secret
  return tokens.create(secret);
}

export function validateTokenWithSecret(secret: string, token: string) {
  // validates the token against the secret
  return tokens.verify(secret, token);
}
