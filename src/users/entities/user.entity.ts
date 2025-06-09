import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  keycloakId!: string;

  @Column({ nullable: true })
  firstname!: string;

  @Column({ nullable: true })
  lastname!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ default: false })
  isAdmin!: boolean;

  @Column({
    type: 'enum',
    enum: ['candidate', 'recruiter', 'admin'],
    default: 'candidate',
  })
  role!: 'candidate' | 'recruiter' | 'admin';

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
