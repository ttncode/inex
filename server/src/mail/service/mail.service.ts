import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/services/auth.service';
import { ResetPasswordDto } from '../dto/ResetPasswordDto';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private jwtService: JwtService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  public async sendVerificationEmail(authDto) {
    const payload = {
      username: authDto.username,
      email: authDto.email,
      password: authDto.password,
    };

    const verifyToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '10m',
    });

    const url = `${process.env.CLIENT_URL}/verify-email/${verifyToken}`;

    const mailOptions = {
      from: 'No-replay.Verify your email for IN.EX Shop!',
      to: authDto.email,
      subject: 'Welcome to IN.EX Shop! Confirm your Email',
      template: '../view/verification.hbs',
      context: {
        username: authDto.username,
        url,
      },
    };

    return this.mailerService.sendMail(mailOptions);
  }

  public async sendResetPasswordEmail(email: string) {
    const verifyToken = await this.jwtService.sign(
      { email },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '10m',
      },
    );

    const url = `${process.env.CLIENT_URL}/reset-password/${verifyToken}`;

    const mailOptions = {
      from: 'No-replay.Verify your email for IN.EX Shop!',
      to: email,
      subject: 'Welcome to IN.EX Shop! Confirm your Email',
      template: '../view/resetPassword.hbs',
      context: {
        username: email,
        url,
      },
    };

    return this.mailerService.sendMail(mailOptions);
  }

  public async verifyEmailToken(response, token: string) {
    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      return this.authService.register(response, user);
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .send('An error occurred during token verification');
    }
  }

  public async verifyResetPasswordToken(response, data: ResetPasswordDto) {
    if (!data.token) return;
    try {
      const tokenData = await this.jwtService.verifyAsync(data.token, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.userService.resetPassword(
        tokenData.email,
        data.newPassword,
      );
      if (!user) return response.status(400).send('Reset Password is failure');
      return response.status(200).send('Reset Password is successfully');
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .send('An error occurred during token verification');
    }
  }
}
