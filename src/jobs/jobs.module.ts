import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { KeycloakConnectModule } from 'nest-keycloak-connect';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), KeycloakConnectModule],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
