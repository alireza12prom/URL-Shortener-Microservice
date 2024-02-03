import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ITokenService, TokenServiceType } from './interface';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async sign(payload: TokenServiceType.ISignInput) {
    const userId = payload.userId;
    const expiresIn = payload.expiresIn;

    delete payload['userId'];
    delete payload['expiresIn'];

    const token = await this.jwt.signAsync(
      { ...payload },
      {
        subject: String(userId),
        encoding: 'utf-8',
        expiresIn: expiresIn,
      },
    );

    return token;
  }

  async verify(token: string) {
    try {
      await this.jwt.verifyAsync(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
