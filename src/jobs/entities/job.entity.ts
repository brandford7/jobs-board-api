import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => User, (user) => user.jobs, { eager: false })
  @JoinColumn({ name: 'createdById' })
  createdBy!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
