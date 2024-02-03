import { ErrorResponseCode } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { RabbitRpcException } from '@app/common/rabbit-rpc-exception';

import {
  IHashService,
  IProfileRepository,
  IProfileService,
  ProfileServiceType,
} from '../interfaces';

@Injectable()
export class ProfileService implements IProfileService {
  constructor(
    @Inject('ProfileRepository')
    private readonly profileRepo: IProfileRepository,

    @Inject('HashService')
    private readonly hashService: IHashService,
  ) {}

  async createProfile(input: ProfileServiceType.ICreateProfile) {
    // check email has is unique
    const hasRegisterBefore = await this.profileRepo.findByEmail(input.email);
    if (hasRegisterBefore) {
      throw new RabbitRpcException(
        'Email has been registered before',
        ErrorResponseCode.PROFILE_REGISTERED_BEFORE,
      );
    }

    // has password
    input.password = await this.hashService.hash(input.password);

    // create a new user
    const user = await this.profileRepo.create(input);
    return user;
  }

  async updateProfile(input: ProfileServiceType.IUpdateProfile) {
    const profile = await this.profileRepo.updateById(input);
    return profile;
  }

  async getProfile(input: ProfileServiceType.IGetProfile) {
    // check profile exists
    let profile;
    if (input.userId) {
      profile = await this.profileRepo.findById(input.userId);
    } else {
      profile = await this.profileRepo.findByEmail(input.email);
    }

    if (!profile) {
      throw new RabbitRpcException(
        'profile is not found',
        ErrorResponseCode.PROFILE_NOT_FOUND,
      );
    }

    // delete password
    delete profile['password'];
    return profile;
  }

  async checkPassword(input: ProfileServiceType.ICheckPassword) {
    // check profile exists
    const profile = await this.profileRepo.findById(input.userId);
    if (!profile) {
      throw new RabbitRpcException(
        'profile is not found',
        ErrorResponseCode.PROFILE_NOT_FOUND,
      );
    }

    // compare password
    const result = await this.hashService.compare(
      input.password,
      profile.password,
    );

    return result;
  }
}
