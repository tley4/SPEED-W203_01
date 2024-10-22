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

  /**
   * Handles user signup requests.
   * Validates the provided input and delegates the signup process to AuthService.
   * Throws appropriate exceptions in case of missing input or conflicts (e.g., existing user).
   *
   * @param signupDto - Data Transfer Object containing signup information (email, password, role)
   */
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    // Validate the provided email and password.
    this.validateSignupInput(signupDto);

    try {
      // Attempt to create a new user via the AuthService.
      return await this.authService.signup(signupDto.email, signupDto.password);
    } catch (error) {
      // Handle any errors encountered during the signup process.
      this.handleSignupError(error);
    }
  }

  /**
   * Handles user login requests.
   * Validates the provided input and delegates the login process to AuthService.
   * Throws an exception if the credentials are invalid.
   *
   * @param loginDto - Data Transfer Object containing login information (email, password)
   */
  
  @Post('login')
  async login(@Body() loginDto: SignupDto) {
    // Validate the provided email and password.
    this.validateLoginInput(loginDto);

    try {
      // Attempt to log the user in via the AuthService.
      return await this.authService.login(loginDto.email, loginDto.password);
    } catch (error) {
      // Throw an exception if login credentials are invalid.
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  /**
   * Validates the input provided for the signup process.
   * Ensures that both email and password are present in the request.
   * Throws a BadRequestException if any required fields are missing.
   *
   * @param signupDto - The DTO containing user signup information.
   */
  private validateSignupInput(signupDto: SignupDto): void {
    const { email, password } = signupDto;
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }
  }

  /**
   * Handles any errors that occur during the signup process.
   * Throws a ConflictException if the user already exists, otherwise throws a generic BadRequestException.
   *
   * @param error - The error object thrown during the signup process.
   */
  private handleSignupError(error: Error): void {
    if (error.message === 'User already exists') {
      throw new ConflictException('User already exists');
    }
    throw new BadRequestException('Server error');
  }

  /**
   * Validates the input provided for the login process.
   * Ensures that both email and password are present in the request.
   * Throws a BadRequestException if any required fields are missing.
   *
   * @param loginDto - The DTO containing user login information.
   */
  private validateLoginInput(loginDto: SignupDto): void {
    const { email, password } = loginDto;
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }
  }
}