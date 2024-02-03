import { Sessions } from '@prisma/client';

export namespace SessionControllerType {
  export interface ICreateSession {
    userId: number;
    version: string;
    platform: string;
    identifier: string;
  }

  export interface IUpdate {
    sessionId: number;
    hash?: string;
  }

  export interface IDiscardSession {
    sessionId: number;
    userId: number;
  }

  export interface IListSessions {
    userId: number;
  }

  export type Response<T = any> = {
    data: T;
  };
}

export interface ISessionController {
  create(
    input: SessionControllerType.ICreateSession,
  ): Promise<SessionControllerType.Response>;

  discard(
    input: SessionControllerType.IDiscardSession,
    header?: any,
  ): Promise<SessionControllerType.Response>;

  list(
    input: SessionControllerType.IListSessions,
    header?: any,
  ): Promise<SessionControllerType.Response<Sessions[]>>;

  update(
    input: SessionControllerType.IUpdate,
  ): Promise<SessionControllerType.Response<Sessions>>;
}
