export namespace AuthControllerType {
  export enum Platform {
    Web = 'Web',
    Android = 'Android',
    IOS = 'IOS',
    Windows = 'Windows',
    MacOS = 'MacOS',
  }

  export interface ILogin {
    identifier: string;
    platform: Platform;
    version: string;
  }

  export interface IRegister {
    fname: string;
    lname: string;
    email: string;
    password: string;
  }

  export type Response<T> = { data: T };
}

export interface IAuthController {
  login(
    input: AuthControllerType.ILogin,
  ): Promise<
    AuthControllerType.Response<{ accessToken: string; refreshToken: string }>
  >;

  register(input: AuthControllerType.IRegister): Promise<any>;
}
