import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { JobQueryDTO } from './dto/job-query-dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    //const jobExists = await this.jobRepo.find({ where: { id } });
    const job = this.jobRepo.create(createJobDto);

    return this.jobRepo.save(job);
  }

  async findAll(query: JobQueryDTO): Promise<{
    data: Job[];
    meta: { offset: number; limit: number; total: number };
  }> {
    const { search, status, sort, offset = 0, limit = 10 } = query;
    const qb = this.jobRepo.createQueryBuilder('job');

    if (search) {
      qb.andWhere('LOWER(job.title) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }
    const total = await qb.getCount();

    const data = await qb.skip(offset).take(limit).getMany();

    return { data, meta: { total, limit, offset } };
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobRepo.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException(`job with id ${id} does not exist`);
    }

    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const job = await this.findOne(id);

    if (!job) {
      throw new NotFoundException(`job with id ${id} does not exist `);
    }
    Object.assign(job, updateJobDto);
    return await this.jobRepo.save(job);
  }

  async remove(id: string): Promise<string> {
    const job = await this.findOne(id);

    if (!job) {
      throw new NotFoundException(`job with id ${id} does not exist `);
    }
    await this.jobRepo.remove(job);
    return id;
  }
}
