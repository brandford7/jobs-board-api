import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { JobQueryDTO } from './dto/job-query-dto';
import { KeycloakUser } from 'src/auth/keycloak.user.interface';
import { JobOwnershipGuard } from 'src/common/guards/job.ownership.guard';

@Controller('api/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @Roles({ roles: ['realm:admin', 'realm:recruiter'] })
  create(
    @Body() createJobDto: CreateJobDto,
    @AuthenticatedUser() user: KeycloakUser,
  ): Promise<Job> {
    return this.jobsService.create(createJobDto, user);
  }

  @Get()
  @Roles({ roles: ['realm:admin'] })
  findAll(@Query() query: JobQueryDTO) {
    return this.jobsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JobOwnershipGuard)
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  @UseGuards(JobOwnershipGuard)
  remove(@Param('id') id: string /*@AuthenticatedUser() user: User*/) {
    return this.jobsService.remove(id);
  }
}
