import { TokenService } from '../jwt/src';
import { LoginDto, RegisterDto } from './dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { IRabbitRpcResponse } from '../common/interfaces';
import { BadRequestException, Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly amqp: AmqpConnection,
    private readonly config: ConfigService,
    private readonly tokenService: TokenService,
  ) {}

  async login(input: LoginDto) {
    let response: IRabbitRpcResponse;

    /**
     * Check user exists
     */
    response = await this.amqp.request<IRabbitRpcResponse>({
      exchange: 'profile-service',
      routingKey: 'user.profile.get',
      timeout: 20000,
      payload: {
        email: input.email,
      },
    });

    if (response.status == 'error') {
      throw new BadRequestException(response.reason);
    }

    const user = response.data;

    /**
     * Check Password
     */
    response = await this.amqp.request<IRabbitRpcResponse>({
      exchange: 'profile-service',
      routingKey: 'user.profile.check_password',
      payload: {
        userId: user.id,
        password: input.password,
      },
    });

    if (response.status == 'error') {
      throw new BadRequestException(response.reason);
    }

    if (!response.data) {
      throw new BadRequestException('password is wrong');
    }

    /**
     * Create Session
     */
    response = await this.amqp.request<IRabbitRpcResponse>({
      exchange: 'session-service',
      routingKey: 'user.session.create',
      payload: {
        userId: user.id,
        identifier: input.identifier,
        version: input.version,
        platform: input.platform,
        locale: input.locale,
      },
    });

    if (response.status == 'error') {
      throw new BadRequestException(response.reason);
    }

    const session = response.data;

    /**
     * Crate token
     */
    const accessToken = await this.tokenService.sign({
      email: user.email,
      userId: user.id,
      identifier: session.identifier,
      name: `${user.fname} ${user.lname}`,
      type: 'access-token',
      expiresIn: this.config.get('JWT_ACCESS_TOKEN_EXPIRE_IN'),
    });

    /**
     * Update Session (hash)
     */
    const hash = createHash('sha256').update(accessToken).digest('hex');

    response = await this.amqp.request<IRabbitRpcResponse>({
      exchange: 'session-service',
      routingKey: 'user.session.update',
      payload: {
        sessionId: session.id,
        hash,
      },
    });

    if (response.status == 'error') {
      throw new BadRequestException('Login failed, please try again later.');
    }

    /**
     * Crate refresh token
     */
    const refreshToken = await this.tokenService.sign({
      userId: user.id,
      identifier: session.identifier,
      type: 'refresh-token',
      hash,
      expiresIn: this.config.get('JWT_REFRESH_TOKEN_EXPIRE_IN'),
    });

    return { accessToken, refreshToken };
  }

  async register(input: RegisterDto) {
    const response = await this.amqp.request<IRabbitRpcResponse>({
      exchange: 'profile-service',
      routingKey: 'user.profile.create',
      timeout: 20000,
      payload: {
        fname: input.fname,
        lname: input.lname,
        email: input.email,
        password: input.password,
      },
    });

    if (response.status == 'error') {
      throw new BadRequestException(response.reason);
    }
  }
}
