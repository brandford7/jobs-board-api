import { KeycloakConnectOptions } from 'nest-keycloak-connect';

export const keycloakConfig: KeycloakConnectOptions = {
  authServerUrl: 'http://localhost:8080/',
  realm: 'jobs-board',
  clientId: 'jobs-board-api',
  secret: 'RR7f9xDWUQ1IAUnoaahZ0E5p92Atm6Q0',
  cookieKey: 'KEYCLOAK_JWT',
  logLevels: ['verbose'],
};
