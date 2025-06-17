import { JobApplication } from 'src/job-application/entities/job.application.entity';
import { Job } from 'src/jobs/entities/job.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  keycloakId!: string;

  @Column({ nullable: true })
  firstname?: string;

  @Column({ nullable: true })
  lastname?: string;

  @Column({ unique: true })
  username?: string;

  @Column({ unique: true })
  email?: string;

  @Column({ default: false })
  isAdmin!: boolean;

  @Column({
    type: 'enum',
    enum: ['candidate', 'recruiter', 'admin'],
    default: 'candidate',
  })
  role!: 'candidate' | 'recruiter' | 'admin';

  @OneToMany(() => Job, (job) => job.createdBy)
  jobs!: Job[];

  @OneToMany(() => JobApplication, (app) => app.applicant)
  applications!: JobApplication[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
