import { RabbitRpcException } from 'libs/common';
import { Inject, Injectable } from '@nestjs/common';
import { ErrorResponseCode } from 'libs/common/response-code';
import {
  ILinkRepository,
  IShortenerService,
  ShortenerServiceType,
} from './interface';

@Injectable()
export class ShortenerService implements IShortenerService {
  constructor(@Inject('LINK_REPOSITORY') private linkRepo: ILinkRepository) {}

  async create(input: ShortenerServiceType.ICreateShortLink) {
    // Generate a random unique string
    // FIXME: send request to another service to get that
    if (!input.shortURL) {
      input.shortURL = 'test';
    }

    // Check expiration is a valid date
    if (input.expireAt) {
      const difference =
        (new Date(input.expireAt).getTime() - Date.now()) / 1000;

      if (difference < 86400) {
        throw new RabbitRpcException(
          'expiration time is not valid',
          ErrorResponseCode.INVALID_EXPIRATION_TIME,
        );
      }
    }

    const link = await this.linkRepo.create({
      userId: input.userId,
      originalUrl: input.longURL,
      shortenedURL: input.shortURL,
      expireAt: input.expireAt,
    });

    return link;
  }

  async list(input: ShortenerServiceType.IListShortLinks) {
    const links = await this.linkRepo.findByUserId(input);
    return links;
  }

  async update(input: ShortenerServiceType.IUpdateShortLink) {
    const link = await this.linkRepo.update(input);

    if (!link) {
      throw new RabbitRpcException(
        'link is not found',
        ErrorResponseCode.LINK_NOT_FOUND,
      );
    }

    return link;
  }
}
