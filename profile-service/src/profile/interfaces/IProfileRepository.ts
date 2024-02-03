import { Users } from '@prisma/client';

export namespace ProfileRepositoryType {
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
}

export interface IProfileRepository {
  findById(id: number): Promise<Users>;
  findByEmail(email: string): Promise<Users>;
  create(input: ProfileRepositoryType.ICreateProfile): Promise<{ id: number }>;

  updateById(
    input: ProfileRepositoryType.IUpdateProfile,
  ): Promise<{ fname: string; lname: string } | null>;
}
