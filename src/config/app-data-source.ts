/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  // @ts-expect-error // TypeORM expects predefined strings for type
  type: configService.getOrThrow<string>('DB_TYPE'),
  host: configService.getOrThrow<string>('DB_HOST'),
  port: configService.getOrThrow<number>('DB_PORT'),
  username: configService.getOrThrow<string>('DB_USER'),
  password: configService.getOrThrow<string>('DB_PASSWORD'),
  database: configService.getOrThrow<string>('DB_NAME'),
  //schema: configService.getOrThrow<string>('DB_SCHEMA'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  synchronize: process.env.ENV !== 'production',
  logging: process.env.ENV !== 'production',
  extra: {
    connectionLimit: 10, // Adjust based on your database connection pool requirements
  },
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
