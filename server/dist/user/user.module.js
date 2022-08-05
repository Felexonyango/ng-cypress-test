"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./controller/user.controller");
const auth_service_1 = require("./service/auth.service");
const user_service_1 = require("./service/user.service");
const jwt_1 = require("@nestjs/jwt");
const jwt_constants_1 = require("./auth/interfaces/jwt.constants");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("./model/user.model");
const user_model_2 = require("./model/user.model");
const auth_controller_1 = require("./controller/auth.controller");
const jwtStratetegy_1 = require("./auth/passport/jwtStratetegy");
const emailverification_schema_1 = require("./model/emailverification.schema");
const forgottenpassword_schema_1 = require("./model/forgottenpassword.schema");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: jwt_constants_1.JWT_SECRET,
                signOptions: { expiresIn: '7d' }
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: user_model_2.User.name, schema: user_model_1.UserSchema },
                { name: 'EmailVerification', schema: emailverification_schema_1.EmailVerificationSchema },
                { name: 'ForgottenPassword', schema: forgottenpassword_schema_1.ForgottenPasswordSchema }
            ]),
        ],
        controllers: [user_controller_1.UserController, auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, user_service_1.UserService, jwtStratetegy_1.JwtStrategy],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map