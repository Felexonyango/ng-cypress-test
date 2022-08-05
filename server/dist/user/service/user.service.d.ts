import { Model } from "mongoose";
import { User } from "../model/user.model";
import { AuthService } from "./auth.service";
export declare class UserService {
    private userModel;
    private authService;
    constructor(userModel: Model<User>, authService: AuthService);
    getUsers(): Promise<(User & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    postUser(data: any): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateUser(id: any, data: any): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteUser(id: any): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findSingleUser(id: any): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
