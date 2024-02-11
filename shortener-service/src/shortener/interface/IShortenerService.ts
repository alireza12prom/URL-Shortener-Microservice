import { Links } from '@prisma/client';

export namespace ShortenerServiceType {
  export type ICreateShortLink = {
    userId: number;
    longURL: string;
    shortURL?: string;
    expireAt?: string;
  };

  export type IUpdateShortLink = {
    linkId: number;
    userId: number;
    longURL?: string;
    shortURL?: string;
    expireAt?: string;
  };

  export type IListShortLinks = {
    userId: number;
    page: number;
    limit: number;
  };
}

export interface IShortenerService {
  create(input: ShortenerServiceType.ICreateShortLink): Promise<Links>;
  list(input: ShortenerServiceType.IListShortLinks): Promise<Links[]>;
  update(input: ShortenerServiceType.IUpdateShortLink): Promise<Links>;
}
