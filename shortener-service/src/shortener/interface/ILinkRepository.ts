import { Links } from '@prisma/client';

export namespace LinkRepositoryType {
  export interface ICreateLink {
    userId: number;
    originalUrl: string;
    shortenedURL: string;
    expireAt?: string;
  }

  export interface IUpdateLink {
    linkId: number;
    userId: number;
    longURL?: string;
    shortURL?: string;
    expireAt?: string;
  }

  export interface IFindByUserId {
    userId: number;
    page: number;
    limit: number;
  }
}

export interface ILinkRepository {
  create(input: LinkRepositoryType.ICreateLink): Promise<Links>;
  findByUserId(input: LinkRepositoryType.IFindByUserId): Promise<Links[]>;
  update(input: LinkRepositoryType.IUpdateLink): Promise<Links | null>;
}
