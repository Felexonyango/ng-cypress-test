import { UserService } from "../service/user.service";
import { User } from "../model/user.model";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUsers(): Promise<(User & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getSingleUser(id: string): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    postUser(data: User): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateUser(id: string, data: Partial<User>): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteUser(id: string): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
