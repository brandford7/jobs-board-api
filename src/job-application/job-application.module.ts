import { Module } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { JobApplicationController } from './job-application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from 'src/jobs/entities/job.entity';
import { User } from 'src/users/entities/user.entity';
import { JobApplication } from './entities/job.application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplication, Job, User])],
  controllers: [JobApplicationController],
  providers: [JobApplicationService],
})
export class JobApplicationModule {}
