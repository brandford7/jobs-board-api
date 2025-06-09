import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { KeycloakConnectModule } from 'nest-keycloak-connect';

@Module({
  imports: [TypeOrmModule.forFeature([User]), KeycloakConnectModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
