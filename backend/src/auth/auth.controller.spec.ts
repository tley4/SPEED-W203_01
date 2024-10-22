import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signup: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should throw BadRequestException if email or password is missing', async () => {
      const signupDto: SignupDto = { email: '', password: '' };

      await expect(authController.signup(signupDto)).rejects.toThrow(BadRequestException);
    });

    it('should return a conflict exception if user already exists', async () => {
      const signupDto: SignupDto = { email: 'test@example.com', password: 'password' };
      jest.spyOn(authService, 'signup').mockRejectedValue(new Error('User already exists'));

      await expect(authController.signup(signupDto)).rejects.toThrow(ConflictException);
    });

    it('should return success message if signup is successful', async () => {
      const signupDto: SignupDto = { email: 'test@example.com', password: 'password' };
      jest.spyOn(authService, 'signup').mockResolvedValue({ message: 'User created successfully' });

      expect(await authController.signup(signupDto)).toEqual({ message: 'User created successfully' });
    });
  });

  describe('login', () => {
    it('should throw BadRequestException if email or password is missing', async () => {
      const loginDto: SignupDto = { email: '', password: '' };

      await expect(authController.login(loginDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      const loginDto: SignupDto = { email: 'test@example.com', password: 'wrongpassword' };
      jest.spyOn(authService, 'login').mockRejectedValue(new UnauthorizedException());

      await expect(authController.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });

    it('should return success message and role if login is successful', async () => {
      const loginDto: SignupDto = { email: 'test@example.com', password: 'password' };
      jest.spyOn(authService, 'login').mockResolvedValue({ message: 'Login successful', role: 'user' });

      expect(await authController.login(loginDto)).toEqual({ message: 'Login successful', role: 'user' });
    });
  });
});