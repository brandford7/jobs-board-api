import { KeycloakUser } from 'src/auth/keycloak.user.interface';

declare global {
  namespace Express {
    interface Request {
      user?: KeycloakUser;
    }
  }
}
