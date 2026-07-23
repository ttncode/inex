import { MailService } from 'src/mail/service/mail.service';
import { Controller, Body, Post, Get, Param, Res } from '@nestjs/common';
import { AuthRegisterDto } from 'src/auth/dto/AuthRegisterDto';
import { Response } from 'express';
import { ResetPasswordDto } from '../dto/ResetPasswordDto';

@Controller('api/mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('register')
  sendVerificationEmail(@Body() authDto: AuthRegisterDto) {
    return this.mailService.sendVerificationEmail(authDto);
  }

  @Get('reset-password/:email')
  sendResetPasswordEmail(@Param('email') email: string) {
    return this.mailService.sendResetPasswordEmail(email);
  }

  @Post('reset-password')
  verifyResetPasswordToken(
    @Res() response: Response,
    @Body() data: ResetPasswordDto,
  ) {
    return this.mailService.verifyResetPasswordToken(response, data);
  }

  @Get('verify/:token')
  verifyEmailTokenAndRedirect(
    @Res() response: Response,
    @Param('token') token: string,
  ) {
    return this.mailService.verifyEmailToken(response, token);
  }
}
