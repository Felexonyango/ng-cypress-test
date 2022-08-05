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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const user_model_1 = require("../model/user.model");
const auth_service_1 = require("../service/auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async loginUser(data) {
        return await this.authService.login(data);
    }
    async registerUser(data, email) {
        return await this.authService.register(data);
    }
    async verifyEmail(params) {
        try {
            var isEmailVerified = await this.authService.verifyEmail(params.token);
            return isEmailVerified;
        }
        catch (error) {
            return error;
        }
    }
    async sendEmailVerification(params) {
        try {
            await this.authService.createEmailToken(params.email);
            var isEmailSent = await this.authService.send(params.email);
            if (isEmailSent) {
                console.log("Email sent");
            }
            else {
                console.log("Email not sent");
            }
        }
        catch (error) {
            return error;
        }
    }
    async sendEmailForgotPassword(params) {
        try {
            const mail = {
                to: params.email,
                subject: 'Greeting Message from NestJS Sendgrid',
                from: 'dev@sibasi.com',
                text: 'Forgot password',
                html: '<h1>Thanks for registering with us .Kudos</h1>'
            };
            return await this.authService.send(mail);
        }
        catch (error) {
            return error;
        }
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Get)('email/verify/:token'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Get)('email/resend-verification/:email'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendEmailVerification", null);
__decorate([
    (0, common_1.Get)('email/forgot-password/:email'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendEmailForgotPassword", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map