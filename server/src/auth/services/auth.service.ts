import * as argon2 from 'argon2';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDto } from '../dto/AuthRegisterDto';
import { AuthLoginDto } from '../dto/AuthLoginDto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  // public async googleLoginRedirect(req, res) {
  //   if (!req.user) {
  //     return 'No user from google';
  //   }
  //   return {
  //     message: 'User information from google',
  //     user: req.user,
  //   };
  // }

  public async authorization(credentials) {
    if (!credentials) return;
    const user = await this.userModel.findOne({ email: credentials.email });
    if (!user) return;

    if (user.hashPassword !== credentials.password) return;
    const { hashPassword, ...userData } = user.toObject();

    return { user: userData };
  }

  public async validateUser(accessToken, refreshToken, profile) {
    try {
      const existUser = await this.userModel.findOne({
        email: profile.emails[0].value,
      });
      if (existUser) {
        const { hashPassword, ...userData } = existUser.toObject();
        return userData;
      }

      const hash = await argon2.hash(profile.id);

      const newUser = new this.userModel({
        username: profile.name.givenName + profile.name.familyName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        hashPassword: hash,
      });
      await newUser.save();

      const { hashPassword, ...userData } = newUser.toObject();

      return userData;
    } catch (error: any) {
      console.error('Registration failed:', error);
      throw new HttpException(
        'Google validate is failed!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async register(response, authDto: AuthRegisterDto): Promise<Response> {
    try {
      const existUser = await this.userModel.findOne({
        email: authDto.email,
      });
      if (existUser) {
        return response
          .status(HttpStatus.NON_AUTHORITATIVE_INFORMATION)
          .json({ message: 'User is exist!' });
      }

      const hash = await argon2.hash(authDto.password);

      // Pick fields explicitly: spreading the body let a client set role or
      // hashPassword and sign up as admin.
      const newUser = new this.userModel({
        username: authDto.username,
        email: authDto.email,
        avatar: authDto.avatar,
        hashPassword: hash,
      });
      await newUser.save();

      const payload = {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      };

      const accessToken = await this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '7d',
      });

      const { hashPassword, ...userData } = newUser.toObject();

      response.cookie('accessToken', accessToken);

      return response
        .status(HttpStatus.OK)
        .json({ message: 'Signup is successful', userData });
    } catch (error: any) {
      console.error('Registration failed:', error);
      throw new HttpException(
        'Registration failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async loginWithGoogle(
    response,
    authDto: AuthRegisterDto,
  ): Promise<Response> {
    try {
      const user = await this.userModel.findOne({
        email: authDto.email,
      });
      if (user) {
        const { hashPassword, ...userData } = user.toObject();
        return response
          .status(HttpStatus.OK)
          .json({ message: 'Login with Google success', user: userData });
      }

      await this.register(response, authDto);
    } catch (error: any) {
      console.error('Registration failed:', error);
      throw new HttpException(
        'Login with Google is failed!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async loginWithAccessToken(request, response) {
    if (!request.user) return;
    return response
      .status(HttpStatus.OK)
      .json({ message: 'Login is successfully', user: request.user });
  }

  public async login(response, authDto: AuthLoginDto): Promise<Response> {
    try {
      const { email, password } = authDto;
      const user = await this.userModel.findOne({ email });
      if (!user) {
        return response
          .status(HttpStatus.NON_AUTHORITATIVE_INFORMATION)
          .json({ message: 'User is not found!' });
      }

      const match = await argon2.verify(user.hashPassword, password);
      if (match) {
        const payload = {
          sub: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        };

        const accessToken = await this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
          expiresIn: '1d',
        });

        const { hashPassword, ...userData } = user.toObject();

        response.cookie('accessToken', accessToken);
        return response
          .status(HttpStatus.OK)
          .json({ message: 'Login is successful', userData });
      }

      return response
        .status(HttpStatus.NON_AUTHORITATIVE_INFORMATION)
        .json({ message: 'Password is not correct!' });
    } catch (error: any) {
      console.error('Error: ' + error);
      throw new HttpException(
        'Login failed!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
