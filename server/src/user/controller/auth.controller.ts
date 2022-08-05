import { Body, Controller, Post, Query,Get,Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/interfaces/auth.guard";
import { User } from "../model/user.model";

import { AuthService } from "../service/auth.service";


@Controller('auth')

export class AuthController {
    
    constructor(private authService:AuthService){}
    
    @Post('/login')
    async loginUser(@Body() data:User){
        return await this.authService.login(data);
    }

    @Post('/register')
    async registerUser(@Body() data:User, @Query('email') email){

        return await this.authService.register(data);
       

        
      
    }
    @Get('email/verify/:token')
    public async verifyEmail(@Param() params) {
      try {
        var isEmailVerified = await this.authService.verifyEmail(params.token);
        return  isEmailVerified
      } catch(error) {

        return  error;
      }
    }
    @Get('email/resend-verification/:email')
    public async sendEmailVerification(@Param() params) {
      try {
        await this.authService.createEmailToken(params.email);
        var isEmailSent = await this.authService.send(params.email);
        if(isEmailSent){
         console.log("Email sent")
        } else {
          console.log("Email not sent")
        }
      } catch(error) {
        return  error;
      }
    }
  
    @Get('email/forgot-password/:email')
    public async sendEmailForgotPassword(@Param() params) {
      try {

        const mail = {
            to: params.email,
            subject: 'Greeting Message from NestJS Sendgrid',
            from: 'dev@sibasi.com',
            text: 'Forgot password',
            html: '<h1>Thanks for registering with us .Kudos</h1>'
        };

        return await this.authService.send(mail)

      } catch(error) {
        return  error;
      }
    }
}