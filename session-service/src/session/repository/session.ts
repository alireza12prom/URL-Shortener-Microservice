import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ISessionRepository, SessionRepositoryType } from '../interface';

@Injectable()
export class SessionRepository implements ISessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: number) {
    return await this.prisma.sessions.findMany({
      where: { userId },
    });
  }

  async create(input: SessionRepositoryType.ICreateSession) {
    return await this.prisma.sessions.create({ data: input });
  }

  async find(input: SessionRepositoryType.IFindSession) {
    return await this.prisma.sessions.findUnique({
      where: { identifier: input.identifier, userId: input.userId },
    });
  }

  async findById(sessionId: number) {
    return await this.prisma.sessions.findUnique({
      where: { id: sessionId },
    });
  }

  async delete(input: SessionRepositoryType.IDeleteSession) {
    return await this.prisma.sessions.delete({
      where: { id: input.sessionId, userId: input.userId },
    });
  }

  async update(input: SessionRepositoryType.IUpdate) {
    return this.prisma.sessions.update({
      where: { id: input.sessionId },
      data: { hash: input.hash },
    });
  }
}
