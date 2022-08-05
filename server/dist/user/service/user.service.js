"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_model_1 = require("../model/user.model");
const auth_service_1 = require("./auth.service");
let UserService = class UserService {
    constructor(userModel, authService) {
        this.userModel = userModel;
        this.authService = authService;
    }
    async getUsers() {
        return await this.userModel.find();
    }
    async postUser(data) {
        data.password = data.name;
        return await (await this.userModel.create(data)).save();
    }
    async updateUser(id, data) {
        await this.findSingleUser(id);
        return await this.userModel.findByIdAndUpdate(id, data, { new: true });
    }
    async deleteUser(id) {
        await this.findSingleUser(id);
        return await this.userModel.findByIdAndDelete(id);
    }
    async findSingleUser(id) {
        const userExists = await this.userModel.findById(id);
        if (userExists) {
            return userExists;
        }
        else {
            throw new common_1.HttpException(`User with ID ${id} does not exists`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map