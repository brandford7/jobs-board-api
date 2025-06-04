import { Injectable } from '@nestjs/common';
import { KeycloakConnectOptions } from 'nest-keycloak-connect';

@Injectable()
export class KeyCloakConfigService {
  createKeyCloakConfig(): KeycloakConnectOptions {
    return {
      authServerUrl: 'http://localhost:8080',
      realm: 'jobs-board',
      secret: 'RR7f9xDWUQ1IAUnoaahZ0E5p92Atm6Q0',
      cookieKey: 'KEYCLOAK_JWT',
      logLevels: ['verbose'],
    };
  }
}
