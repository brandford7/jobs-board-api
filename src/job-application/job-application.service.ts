import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
//import { CreateJobApplicationDto } from './dto/create-job-application.dto';
//import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { QueryFailedError, Repository } from 'typeorm';
import { JobApplication } from './entities/job.application.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/jobs/entities/job.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectRepository(JobApplication)
    private readonly jobAppRepo: Repository<JobApplication>,
    @InjectRepository(Job) private jobRepo: Repository<Job>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async apply(jobId: string, userId: string): Promise<JobApplication> {
    const job = await this.jobRepo.findOne({
      where: { id: jobId },
      relations: ['createdBy'],
    });

    if (!job || !job.isActive) {
      throw new NotFoundException('Job not found or inactive');
    }

    if (job.createdBy.id === userId) {
      throw new ForbiddenException('You cannot apply to your own job');
    }

    const user = await this.userRepo.findOne({ where: { keycloakId: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingApplication = await this.jobAppRepo.findOne({
      where: {
        job: { id: jobId },
        applicant: { id: user.id },
      },
    });

    if (existingApplication) {
      throw new ConflictException('You have already applied for this job');
    }

    if (!job || !job.isActive)
      throw new NotFoundException('Job not found or inactive');

    if (job.createdBy.keycloakId === userId)
      throw new ForbiddenException('You cannot apply to your own job');

    const application = this.jobAppRepo.create({ job, applicant: user });

    try {
      return await this.jobAppRepo.save(application);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate key')
      ) {
        throw new ConflictException('You have already applied for this job');
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findAllApplications(): Promise<JobApplication[]> {
    const jobs = await this.jobAppRepo.find();
    return jobs;
  }

  async getApplicationsByUser(userId: string): Promise<JobApplication[]> {
    const jobs = await this.jobAppRepo.find({
      where: {
        applicant: { id: userId },
      },
      relations: ['job'],
      order: { appliedAt: 'DESC' },
    });

    return jobs;
  }

  async cancelApplication(userId: string, appId: string) {
    const app = await this.jobAppRepo.findOne({
      where: { id: appId },
      relations: ['applicant'],
    });

    if (!app || app.applicant.keycloakId !== userId)
      throw new NotFoundException('Application not found or not yours');

    await this.jobAppRepo.remove(app);
    return { message: 'Application cancelled successfully' };
  }
}
