import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
//import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /* @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }*/

  @Get()
  @Roles({ roles: ['realm:admin'] }) // Only admins can list users
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get('/me')
  async getMe(@AuthenticatedUser() user: any) {
    return this.usersService.findUser(user);
  }
  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
*/
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
