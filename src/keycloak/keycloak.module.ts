import { Module } from '@nestjs/common';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { KeyCloakConfigService } from './keycloak-config.service';

@Module({
  providers: [KeyCloakConfigService, ResourceGuard, RoleGuard, AuthGuard],
  exports: [KeycloakConnectModule],
})
export class KeycloakModule {}
