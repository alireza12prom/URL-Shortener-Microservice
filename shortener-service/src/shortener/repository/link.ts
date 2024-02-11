import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ILinkRepository, LinkRepositoryType } from '../interface';

@Injectable()
export class LinkRepository implements ILinkRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: LinkRepositoryType.ICreateLink) {
    return await this.prisma.links.create({
      data: {
        userId: input.userId,
        originalUrl: input.originalUrl,
        shortenedUrl: input.shortenedURL,
        expireAt: input.expireAt,
      },
    });
  }

  async findByUserId(input: LinkRepositoryType.IFindByUserId) {
    return await this.prisma.links.findMany({
      where: { userId: input.userId },
      take: input.limit,
      skip: (input.page - 1) * input.limit,
    });
  }

  async update(input: LinkRepositoryType.IUpdateLink) {
    return await this.prisma.links.update({
      where: { id: input.linkId, userId: input.userId },
      data: {
        originalUrl: input.longURL,
        shortenedUrl: input.shortURL,
        expireAt: input.expireAt,
      },
    });
  }
}
