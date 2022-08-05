import * as mongoose from 'mongoose';
export declare const ForgottenPasswordSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    email?: string;
    timestamp?: Date;
    newPasswordToken?: string;
}>;
