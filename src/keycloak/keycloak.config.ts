import { ConfigService } from '@nestjs/config';
import { KeycloakConnectOptions } from 'nest-keycloak-connect';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const keycloakConfig: KeycloakConnectOptions = {
  authServerUrl: 'http://localhost:8080/',
  realm: configService.getOrThrow<string>('KEYCLOAK_REALM'),
  clientId: configService.getOrThrow<string>('KEYCLOAK_CLIENT_ID'),
  secret: configService.getOrThrow<string>('KEYCLOAK_SECRET'),
  cookieKey: configService.getOrThrow<string>('KEYCLOAK_COOKIE_KEY'),
  logLevels: ['verbose'],
};
