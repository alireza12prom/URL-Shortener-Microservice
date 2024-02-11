import { Inject, Injectable } from '@nestjs/common';
import { ErrorResponseCode, RabbitRpcException } from '../common';

import {
  ISessionRepository,
  ISessionService,
  SessionServiceType,
} from './interface';

@Injectable()
export class SessionService implements ISessionService {
  constructor(
    @Inject('SESSION_REPOSITORY')
    private repository: ISessionRepository,
  ) {}

  async create(input: SessionServiceType.ICreateSession) {
    let session = await this.repository.find({
      identifier: input.identifier,
      userId: input.userId,
    });

    // create a new one if not exists
    if (!session) {
      session = await this.repository.create(input);
    }

    return session;
  }

  async discard(input: SessionServiceType.IDiscardSession) {
    const session = await this.repository.delete({
      sessionId: input.sessionId,
      userId: input.userId,
    });

    if (!session) {
      // TODO: throw error
    }
  }

  async list(input: SessionServiceType.IListSessions) {
    const sessions = await this.repository.findByUserId(input.userId);
    return sessions;
  }

  async update(input: SessionServiceType.IUpdate) {
    const result = await this.repository.update(input);
    if (!result) {
      throw new RabbitRpcException(
        'Session is not found',
        ErrorResponseCode.SESSION_NOT_FOUND,
      );
    }

    return result;
  }
}
