import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { UserQueryDTO } from './dto/user-query-dto';
import { KeycloakUser } from 'src/auth/keycloak.user.interface';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles({ roles: ['realm:admin'] }) // Only admins can list users
  async getAllUsers(@Query() query: UserQueryDTO) {
    return this.usersService.findAll(query);
  }

  @Get('/me')
  async getMe(@AuthenticatedUser() user: KeycloakUser) {
    return this.usersService.getUserProfile(user);
  }

  @Delete(':id')
  @Roles({ roles: ['realm:admin'] })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
