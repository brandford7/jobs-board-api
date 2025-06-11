import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserQueryDTO } from './dto/user-query-dto';
import { KeycloakUser } from 'src/auth/keycloak.user.interface';
//import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  /*create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
*/
  async findAll(query: UserQueryDTO): Promise<{
    data: User[];
    meta: { total: number; offset: number; limit: number };
  }> {
    const {
      search,
      order = 'ASC',
      sortBy = 'createdAt',
      createdBefore,
      createdAfter,
      role,
      offset = 0,
      limit = 10,
    } = query;

    const qb = this.userRepo.createQueryBuilder('user');

    // Search by name fields
    if (search) {
      qb.andWhere(
        '(LOWER(user.firstname) LIKE LOWER(:search) OR LOWER(user.lastname) LIKE LOWER(:search) OR LOWER(user.username) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    // Filter by role
    if (role) {
      qb.andWhere('user.role = :role', { role });
    }

    // Filter by date range
    if (createdAfter) {
      qb.andWhere('user.createdAt >= :createdAfter', { createdAfter });
    }

    if (createdBefore) {
      qb.andWhere('user.createdAt <= :createdBefore', { createdBefore });
    }

    // Sorting
    qb.orderBy(`user.${sortBy}`, order);

    //pagination
    qb.skip(offset).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return { data, meta: { total, offset, limit } };
  }

  async findUser(kcUser: KeycloakUser): Promise<User> {
    const keycloakId = kcUser.sub;

    // Try to find the user in the DB
    let user = await this.userRepo.findOne({ where: { keycloakId } });

    const isAdmin = kcUser.realm_access?.roles?.includes('admin') || false;

    // Detect roles from Keycloak
    let role: 'admin' | 'recruiter' | 'candidate' = 'candidate';
    if (kcUser.realm_access?.roles?.includes('recruiter')) {
      role = 'recruiter';
    }
    if (kcUser.realm_access?.roles?.includes('admin')) {
      role = 'admin';
    }

    // If user does not exist, create
    if (!user) {
      user = this.userRepo.create({
        keycloakId,
        firstname: kcUser.given_name,
        lastname: kcUser.family_name,
        username: kcUser.preferred_username,
        email: kcUser.email,
        role,
        isAdmin,
      });
    } else {
      // Otherwise, update their data to reflect any changes from Keycloak
      user.firstname = kcUser.given_name;
      user.lastname = kcUser.family_name;
      user.username = kcUser.preferred_username;
      user.email = kcUser.email;
      user.role = role;
      user.isAdmin = isAdmin;
    }

    return this.userRepo.save(user); // save new or updated user
  }

  /*update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
*/
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
