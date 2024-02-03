import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { Controller, Post, Body, Version } from '@nestjs/common';
import { IAuthController } from './interfaces';

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Version('1')
  async login(@Body() body: LoginDto) {
    const result = await this.authService.login(body);
    return { data: result };
  }

  @Post('register')
  @Version('1')
  async register(@Body() body: RegisterDto) {
    await this.authService.register(body);
  }
}
