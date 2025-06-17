import {
  Controller,
  Get,
  Post,
  Body,
  //  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
//import { CreateJobApplicationDto } from './dto/create-job-application.dto';
//import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { KeycloakUser } from 'src/auth/keycloak.user.interface';

@Controller('/api/applications')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @Post(':id')
  async apply(
    @Param('id') jobId: string,
    @AuthenticatedUser() user: KeycloakUser,
  ) {
    const userId = user.sub;
    return await this.jobApplicationService.apply(jobId, userId);
  }

  @Get()
  async findAllApplications() {
    return await this.jobApplicationService.findAllApplications();
  }

  @Get(':id')
  @Roles({ roles: ['realm:candidate', 'realm:candidate'] })
  async getApplicationsByUser(
    @Param('id') id: string,
    @AuthenticatedUser() user: KeycloakUser,
  ) {
    const userId = user.sub;
    return await this.jobApplicationService.getApplicationsByUser(userId);
  }

  /*
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobApplicationDto: UpdateJobApplicationDto,
  ) {
    return this.jobApplicationService.update(+id, updateJobApplicationDto);
  }
*/

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @AuthenticatedUser() user: KeycloakUser,
  ) {
    const userId = user.sub;
    return await this.jobApplicationService.cancelApplication(userId, id);
  }
}
