import { Model } from "mongoose";
import { User } from "../model/user.model";
import { JwtService } from "@nestjs/jwt";
import { EmailVerification } from "../auth/interfaces/emailverification.interface";
import { ForgottenPassword } from "../auth/interfaces/forgottenpassword.interface";
import * as SendGrid from '@sendgrid/mail';
export declare class AuthService {
    private userModel;
    private readonly forgottenpasswordModel;
    private readonly emailVerificationModel;
    private jwtService;
    constructor(userModel: Model<User>, forgottenpasswordModel: Model<ForgottenPassword>, emailVerificationModel: Model<EmailVerification>, jwtService: JwtService);
    register(data: User): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    login(data: User): Promise<{
        jwtToken: string;
    }>;
    checkUserExists(email: any): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    generateToken(user: any): Promise<string>;
    createForgottenPasswordToken(email: string): Promise<ForgottenPassword>;
    verifyEmail(token: string): Promise<boolean>;
    getForgottenPasswordModel(newPasswordToken: string): Promise<ForgottenPassword>;
    createEmailToken(email: string): Promise<boolean>;
    send(mail: SendGrid.MailDataRequired): Promise<[SendGrid.ClientResponse, {}]>;
}
