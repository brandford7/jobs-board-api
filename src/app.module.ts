import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsModule } from './jobs/jobs.module';
import { keycloakConfig } from './keycloak/keycloak.config';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { JobApplicationModule } from './job-application/job-application.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
/*import { User } from './users/entities/user.entity';
import { Job } from './jobs/entities/job.entity';
import { JobApplication } from './job-application/entities/job.application.entity'; */
import { dataSourceOptions } from './config/app-data-source';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 30000,
          limit: 5,
        },
      ],
    }),

    UsersModule,
    AuthModule,
    KeycloakConnectModule.register(keycloakConfig),
    JobsModule,
    JobApplicationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },

    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
