import * as mongoose from 'mongoose';
export declare const EmailVerificationSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    email?: string;
    timestamp?: Date;
    emailToken?: string;
}>;
