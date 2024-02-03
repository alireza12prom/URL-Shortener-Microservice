import { Platform, Sessions } from '@prisma/client';

export namespace SessionRepositoryType {
  export interface ICreateSession {
    userId: number;
    identifier: string;
    platform: Platform;
    version: string;
    locale: string;
  }

  export interface IUpdate {
    sessionId: number;
    hash?: string;
  }

  export interface IFindSession {
    userId: number;
    identifier: string;
  }

  export interface IDeleteSession {
    userId: number;
    sessionId: number;
  }
}

export interface ISessionRepository {
  create(input: SessionRepositoryType.ICreateSession): Promise<Sessions>;
  find(input: SessionRepositoryType.IFindSession): Promise<Sessions | null>;
  findById(sessionId: number): Promise<Sessions | null>;
  findByUserId(userId: number): Promise<Sessions[]>;
  delete(input: SessionRepositoryType.IDeleteSession): Promise<Sessions | null>;
  update(input: SessionRepositoryType.IUpdate): Promise<Sessions | null>;
}
