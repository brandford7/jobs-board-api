// src/common/guards/job-ownership.guard.ts
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DataSource, Repository } from 'typeorm';
import { Request } from 'express';
import { KeycloakUser } from 'src/auth/keycloak.user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/jobs/entities/job.entity';

@Injectable()
export class JobOwnershipGuard implements CanActivate {
  constructor(
    private dataSource: DataSource,
    private reflector: Reflector,
    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as KeycloakUser;
    const jobId = request.params.id;

    if (!jobId || !user) {
      throw new ForbiddenException('Missing user or job ID');
    }

    const job = await this.jobRepo.findOne({
      where: { id: jobId },
      relations: ['createdBy'],
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    const isOwner = job.createdBy.keycloakId === user.sub;
    const isAdmin = user.realm_access?.roles.includes('admin');

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('You are not authorized to modify this job');
    }

    return true;
  }
}
