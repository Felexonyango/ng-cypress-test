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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_model_1 = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const SendGrid = require("@sendgrid/mail");
let AuthService = class AuthService {
    constructor(userModel, forgottenpasswordModel, emailVerificationModel, jwtService) {
        this.userModel = userModel;
        this.forgottenpasswordModel = forgottenpasswordModel;
        this.emailVerificationModel = emailVerificationModel;
        this.jwtService = jwtService;
    }
    async register(data) {
        const userExists = await this.checkUserExists(data.email);
        if (userExists) {
            throw new common_1.HttpException('User already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            const { password, email, name } = data;
            data.password = data.name;
            const passwordHash = await bcrypt.hash(password, 10);
            const user = new this.userModel({
                name,
                email,
                password: passwordHash,
            });
            const newUser = await user.save();
            return newUser;
        }
    }
    async login(data) {
        const userExists = await this.checkUserExists(data.email);
        if (userExists) {
            const passwordMatch = await bcrypt.compare(data.password, userExists.password);
            if (passwordMatch) {
                const token = await this.generateToken(userExists);
                return {
                    jwtToken: token
                };
            }
            else {
                throw new common_1.HttpException('Wrong credentials provided', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else {
            throw new common_1.HttpException('User details not found, try again', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async checkUserExists(email) {
        const userExists = await this.userModel.findOne({ email: email });
        return userExists;
    }
    async generateToken(user) {
        const payload = { id: user._id, email: user.email };
        const token = this.jwtService.sign(payload);
        return token;
    }
    async createForgottenPasswordToken(email) {
        const forgottenPassword = await this.forgottenpasswordModel.findOne({ email: email });
        if (forgottenPassword && ((new Date().getTime() - forgottenPassword.timestamp.getTime()) / 60000 < 15)) {
            throw new common_1.HttpException('Reset password email sent recently', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else {
            const forgottenPasswordModel = await this.forgottenpasswordModel.findOneAndUpdate({ email: email }, {
                email: email,
                newPasswordToken: (Math.floor(Math.random() * (9000000)) + 1000000).toString(),
                timestamp: new Date()
            }, { upsert: true, new: true });
            if (forgottenPasswordModel) {
                return forgottenPasswordModel;
            }
            else {
                throw new common_1.HttpException('Login error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async verifyEmail(token) {
        var emailVerify = await this.emailVerificationModel.findOne({ emailToken: token });
        if (emailVerify && emailVerify.email) {
            const userFromDb = await this.userModel.findOne({ email: emailVerify.email });
            if (userFromDb) {
                const savedUser = await userFromDb.save();
                await emailVerify.remove();
                return !!savedUser;
            }
        }
        else {
            throw new common_1.HttpException('Login email is not found', common_1.HttpStatus.FORBIDDEN);
        }
    }
    async getForgottenPasswordModel(newPasswordToken) {
        return await this.forgottenpasswordModel.findOne({ newPasswordToken: newPasswordToken });
    }
    async createEmailToken(email) {
        var emailVerification = await this.emailVerificationModel.findOne({ email: email });
        if (emailVerification && ((new Date().getTime() - emailVerification.timestamp.getTime()) / 60000 < 15)) {
            throw new common_1.HttpException('LOGIN.EMAIL_SENT_RECENTLY', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else {
            const emailVerificationModel = await this.emailVerificationModel.findOneAndUpdate({ email: email }, {
                email: email,
                emailToken: (Math.floor(Math.random() * (9000000)) + 1000000).toString(),
                timestamp: new Date()
            }, { upsert: true });
            return true;
        }
    }
    async send(mail) {
        const transport = await SendGrid.send(mail);
        console.log(`Email successfully sent to ${mail.to}`);
        return transport;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)('ForgottenPassword')),
    __param(2, (0, mongoose_1.InjectModel)('EmailVerification')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map