import { Users } from '@prisma/client';

export namespace ProfileServiceType {
  export interface ICreateProfile {
    fname: string;
    lname: string;
    email: string;
    password: string;
  }

  export interface IUpdateProfile {
    userId: number;
    fname?: string;
    lname?: string;
  }

  export interface IGetProfile {
    userId?: number;
    email?: string;
  }

  export interface ICheckPassword {
    userId: number;
    password: string;
  }
}

export interface IProfileService {
  createProfile(
    input: ProfileServiceType.ICreateProfile,
  ): Promise<{ id: number }>;

  updateProfile(
    input: ProfileServiceType.IUpdateProfile,
  ): Promise<{ fname: string; lname: string }>;

  getProfile(input: ProfileServiceType.IGetProfile): Promise<Users>;
  checkPassword(input: ProfileServiceType.ICheckPassword): Promise<boolean>;
}
