import {
  Controller,
  Post,
  Body,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const { email, password, role } = signupDto;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    try {
      return await this.authService.signup(email, password);
    } catch (error) {
      if (error.message === 'User already exists') {
        throw new ConflictException('User already exists');
      }
      throw new BadRequestException('Server error');
    }
  }

  @Post('login')
  async login(@Body() loginDto: SignupDto) {
    const { email, password } = loginDto;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    try {
      return await this.authService.login(email, password);
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
