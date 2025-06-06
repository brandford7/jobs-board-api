import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('job')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column()
  company!: string;

  @Column()
  location!: string;

  @Column()
  jobType!: string; // e.g., 'Full-time', 'Part-time', 'Remote', etc.

  @Column({ default: true })
  isActive!: boolean;

  @Column({ nullable: true })
  salary!: string; // e.g., '$60k - $80k'

  @Column({ nullable: true })
  experienceLevel!: string; // e.g., 'Entry', 'Mid', 'Senior'

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
