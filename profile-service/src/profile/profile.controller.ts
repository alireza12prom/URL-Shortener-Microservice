import { RPCResponseInterceptor } from '../decorator';
import { Controller, Inject, UseInterceptors } from '@nestjs/common';
import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import {
  GetProfileDto,
  CreateProfileDto,
  UpdateProfileDto,
  CheckPasswordDto,
} from './dto';

import {
  IProfileService,
  IProfileController,
  ProfileControllerType,
} from './interfaces';

@Controller()
export class ProfileController implements IProfileController {
  constructor(
    @Inject('ProfileService')
    private readonly profileService: IProfileService,
  ) {}

  @RabbitSubscribe({
    queue: 'create-profile',
    routingKey: 'user.profile.create',
    allowNonJsonMessages: false,
    createQueueIfNotExists: true,
    queueOptions: {
      messageTtl: 20000, // 20 sec
      arguments: {
        'x-queue-type': 'quorum',
      },
    },
  })
  @UseInterceptors(RPCResponseInterceptor)
  async createProfile(
    @RabbitPayload() payload: CreateProfileDto,
  ): Promise<ProfileControllerType.Response> {
    const result = await this.profileService.createProfile(payload);
    return { data: result };
  }

  @RabbitSubscribe({
    queue: 'update-profile',
    routingKey: 'user.profile.update',
    allowNonJsonMessages: false,
    createQueueIfNotExists: true,
    queueOptions: {
      messageTtl: 20000, // 20 sec
      arguments: {
        'x-queue-type': 'quorum',
      },
    },
  })
  @UseInterceptors(RPCResponseInterceptor)
  async updateProfile(
    @RabbitPayload() payload: UpdateProfileDto,
  ): Promise<ProfileControllerType.Response> {
    const result = await this.profileService.updateProfile(payload);
    return { data: result };
  }

  @RabbitSubscribe({
    queue: 'get-profile',
    routingKey: 'user.profile.get',
    allowNonJsonMessages: false,
    createQueueIfNotExists: true,
    queueOptions: {
      messageTtl: 20000, // 20 sec
      arguments: {
        'x-queue-type': 'quorum',
      },
    },
  })
  @UseInterceptors(RPCResponseInterceptor)
  async getProfile(
    @RabbitPayload() payload: GetProfileDto,
  ): Promise<ProfileControllerType.Response> {
    const result = await this.profileService.getProfile(payload);
    return { data: result };
  }

  @RabbitSubscribe({
    queue: 'check-password-profile',
    routingKey: 'user.profile.check_password',
    allowNonJsonMessages: false,
    createQueueIfNotExists: true,
    queueOptions: {
      messageTtl: 20000, // 20 sec
      arguments: {
        'x-queue-type': 'quorum',
      },
    },
  })
  @UseInterceptors(RPCResponseInterceptor)
  async checkPassword(@RabbitPayload() payload: CheckPasswordDto) {
    const result = await this.profileService.checkPassword(payload);
    return { data: result };
  }
}
