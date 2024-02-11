export namespace TokenServiceType {
  export type ISignInput =
    | {
        userId: string;
        identifier: string;
        name: string;
        email: string;
        expiresIn: string;
        type: 'access-token';
      }
    | {
        userId: string;
        identifier: string;
        expiresIn: string;
        hash: string;
        type: 'refresh-token';
      };
}

export interface ITokenService {
  sign(payload: TokenServiceType.ISignInput): Promise<string>;
  verify(token: string): Promise<boolean>;
}
