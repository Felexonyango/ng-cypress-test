import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './auth/interfaces/jwt.constants';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './model/user.model';
import { User } from './model/user.model';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './auth/passport/jwtStratetegy'
import { EmailVerificationSchema } from './model/emailverification.schema';
import { ForgottenPasswordSchema } from './model/forgottenpassword.schema';
@Module({
  imports:[

    JwtModule.register({
      secret:JWT_SECRET,
      signOptions:{expiresIn:'7d'}
  }),
  MongooseModule.forFeature([
    {name:User.name, schema:UserSchema},
    { name: 'EmailVerification', schema: EmailVerificationSchema },
    {name:'ForgottenPassword', schema:ForgottenPasswordSchema}
  
  ]),
  
  ],
  
  controllers: [UserController, AuthController],
  providers: [AuthService, UserService,JwtStrategy],
})
export class UserModule {}