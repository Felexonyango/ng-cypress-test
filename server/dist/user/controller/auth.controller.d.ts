import { User } from "../model/user.model";
import { AuthService } from "../service/auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    loginUser(data: User): Promise<{
        jwtToken: string;
    }>;
    registerUser(data: User, email: any): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    verifyEmail(params: any): Promise<any>;
    sendEmailVerification(params: any): Promise<any>;
    sendEmailForgotPassword(params: any): Promise<any>;
}
