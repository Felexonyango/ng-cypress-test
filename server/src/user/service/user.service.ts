import { HttpException, HttpStatus, Injectable} from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { User } from "../model/user.model"
import { AuthService } from "./auth.service"

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel:Model<User>,
        private authService:AuthService
        ){}

 
    async getUsers(){
        return await this.userModel.find();
    }

    async postUser(data){
        data.password = data.name;
        return await (await this.userModel.create(data)).save();
    }

    async updateUser(id, data){
        await this.findSingleUser(id);
        return await this.userModel.findByIdAndUpdate(id, data, {new:true});
    }

    async deleteUser(id){
        await this.findSingleUser(id);
        return await this.userModel.findByIdAndDelete(id);
    }

    async findSingleUser(id){
        const userExists = await this.userModel.findById(id);
        if(userExists) {
            return userExists;
        } else {
            throw new HttpException(`User with ID ${id} does not exists`, HttpStatus.BAD_REQUEST);
        }
    }
}