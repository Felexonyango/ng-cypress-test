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
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BooksService = class BooksService {
    constructor(model) {
        this.model = model;
    }
    async create(createBookDto) {
        return await (await this.model.create(Object.assign(Object.assign({}, createBookDto), { createdAt: new Date() }))).save();
    }
    async findAll() {
        return await this.model.find();
    }
    async findOne(id) {
        return await this.model.findById(id);
    }
    async update(id, updateBookDto) {
        return await this.model.findByIdAndUpdate(id, updateBookDto);
    }
    async remove(id) {
        return await this.model.findByIdAndRemove(id);
    }
};
BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Book')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BooksService);
exports.BooksService = BooksService;
//# sourceMappingURL=book.service.js.map