import { Platform, Sessions } from '@prisma/client';

export namespace SessionServiceType {
  export type ICreateSession = {
    userId: number;
    identifier: string;
    platform: Platform;
    version: string;
    locale: string;
  };

  export type IUpdate = {
    sessionId: number;
    hash?: string;
  };

  export type IDiscardSession = {
    sessionId: number;
    userId: number;
  };

  export type IListSessions = {
    userId: number;
  };
}

export interface ISessionService {
  create(input: SessionServiceType.ICreateSession): Promise<Sessions>;
  list(input: SessionServiceType.IListSessions): Promise<Sessions[]>;
  discard(input: SessionServiceType.IDiscardSession): Promise<void>;
  update(input: SessionServiceType.IUpdate): Promise<Sessions>;
}
