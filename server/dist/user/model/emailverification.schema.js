"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerificationSchema = void 0;
const mongoose = require("mongoose");
exports.EmailVerificationSchema = new mongoose.Schema({
    email: String,
    emailToken: String,
    timestamp: Date
});
//# sourceMappingURL=emailverification.schema.js.map