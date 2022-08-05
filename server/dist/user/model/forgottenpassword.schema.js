"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgottenPasswordSchema = void 0;
const mongoose = require("mongoose");
exports.ForgottenPasswordSchema = new mongoose.Schema({
    email: String,
    newPasswordToken: String,
    timestamp: Date
});
//# sourceMappingURL=forgottenpassword.schema.js.map