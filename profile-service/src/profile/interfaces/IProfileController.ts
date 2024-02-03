export namespace ProfileControllerType {
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

  export type Response = { data: any };
}

export interface IProfileController {
  createProfile(
    input: ProfileControllerType.ICreateProfile,
    header?: any,
  ): Promise<ProfileControllerType.Response>;

  updateProfile(
    input: ProfileControllerType.IUpdateProfile,
    header?: any,
  ): Promise<ProfileControllerType.Response>;

  getProfile(
    input: ProfileControllerType.IGetProfile,
    header?: any,
  ): Promise<ProfileControllerType.Response>;

  checkPassword(
    input: ProfileControllerType.ICheckPassword,
    header?: any,
  ): Promise<ProfileControllerType.Response>;
}
