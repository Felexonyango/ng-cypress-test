import { HttpException, HttpStatus, Injectable, Options } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../model/user.model"
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { EmailVerification } from "../auth/interfaces/emailverification.interface";
import { ForgottenPassword } from "../auth/interfaces/forgottenpassword.interface";
import * as SendGrid from '@sendgrid/mail';


@Injectable()
export class AuthService {

    constructor( @InjectModel(User.name) private userModel:Model<User>,
    @InjectModel('ForgottenPassword') private readonly forgottenpasswordModel:Model<ForgottenPassword>,
    @InjectModel('EmailVerification') private readonly emailVerificationModel: Model<EmailVerification>,
     private jwtService:JwtService
        ){
         
        }

    async register(data:User){
        const userExists = await this.checkUserExists(data.email);
        if(userExists){
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        } else {
        const {password, email,name}=data;
            data.password = data.name;
            const passwordHash = await bcrypt.hash(password, 10);

            const user = new this.userModel({
                name,
                email,
                password:passwordHash,

            })
         const newUser =await user.save();
         return newUser;
            
        }
    }


    async login(data:User){
        const userExists = await this.checkUserExists(data.email);
        if(userExists){
            const passwordMatch = await bcrypt.compare(data.password, userExists.password);
            if(passwordMatch) {
                const token = await this.generateToken(userExists);
                return {
                    jwtToken:token
                }
            } else {
                throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST)
            }
            
        } else {
            throw new HttpException('User details not found, try again', HttpStatus.BAD_REQUEST);
        }
    }

    async checkUserExists(email){
    
        const userExists = await this.userModel.findOne({email:email});
        return userExists;
    }


    async generateToken(user){
        const payload = { id:user._id, email:user.email };
        const token = this.jwtService.sign(payload);
        return token;
    }

  

  async createForgottenPasswordToken(email: string): Promise<ForgottenPassword> {
    const forgottenPassword= await this.forgottenpasswordModel.findOne({email: email});

    if (forgottenPassword && ( (new Date().getTime() - forgottenPassword.timestamp.getTime()) / 60000 < 15 )){
      throw new HttpException('Reset password email sent recently', HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
    const  forgottenPasswordModel = await this.forgottenpasswordModel.findOneAndUpdate(
        {email: email},
        { 
          email: email,
          newPasswordToken: (Math.floor(Math.random() * (9000000)) + 1000000).toString(), //Generate 7 digits number,
          timestamp: new Date()
        },
        {upsert: true, new: true}
      );
      if(forgottenPasswordModel){
        return forgottenPasswordModel;
      } else {
        throw new HttpException('Login error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async verifyEmail(token: string): Promise<boolean> {
    var emailVerify = await this.emailVerificationModel.findOne({ emailToken: token});
    if(emailVerify && emailVerify.email){
      const userFromDb = await this.userModel.findOne({ email: emailVerify.email});
      if (userFromDb) {
       
        const savedUser = await userFromDb.save();
        await emailVerify.remove();
        return !!savedUser;
      }
    } else {
      throw new HttpException('Login email is not found', HttpStatus.FORBIDDEN);
    }
  }
  
  async getForgottenPasswordModel(newPasswordToken: string): Promise<ForgottenPassword> {
    return await this.forgottenpasswordModel.findOne({newPasswordToken: newPasswordToken});
  }

  async createEmailToken(email: string): Promise<boolean> {
    var emailVerification = await this.emailVerificationModel.findOne({email: email}); 
    if (emailVerification && ( (new Date().getTime() - emailVerification.timestamp.getTime()) / 60000 < 15 )){
      throw new HttpException('LOGIN.EMAIL_SENT_RECENTLY', HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
      const  emailVerificationModel = await this.emailVerificationModel.findOneAndUpdate( 
        {email: email},
        { 
          email: email,
          emailToken: (Math.floor(Math.random() * (9000000)) + 1000000).toString(), //Generate 7 digits number
          timestamp: new Date()
        },
        {upsert: true}
      );
      return true;
    }
  }

  async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);

    console.log(`Email successfully sent to ${mail.to}`)
    return transport;


}
}