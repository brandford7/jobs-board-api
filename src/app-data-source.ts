import { DataSource } from 'typeorm';
import { Job } from './jobs/entities/job.entity';
import { JobApplication } from './job-application/entities/job.application.entity';
import { User } from './users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'jobsdb',
  entities: [Job, JobApplication, User], // include all your entities here
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
