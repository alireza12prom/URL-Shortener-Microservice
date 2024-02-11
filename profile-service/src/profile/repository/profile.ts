import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { IProfileRepository, ProfileRepositoryType } from '../interfaces';

@Injectable()
export class ProfileRepository implements IProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number) {
    const result = await this.prisma.users.findUnique({
      where: { id },
    });

    return result;
  }

  async findByEmail(email: string) {
    const result = await this.prisma.users.findUnique({
      where: { email: email },
    });

    return result;
  }

  async create(input: ProfileRepositoryType.ICreateProfile) {
    const result = await this.prisma.users.create({
      data: input,
      select: { id: true },
    });

    return result;
  }

  async updateById(input: ProfileRepositoryType.IUpdateProfile) {
    const result = await this.prisma.users.update({
      where: { id: input.userId },
      data: { fname: input.fname, lname: input.lname },
      select: { fname: true, lname: true },
    });

    return result;
  }
}
