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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("./User");
let Post = class Post {
};
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true, index: true }),
    __metadata("design:type", String)
], Post.prototype, "unique_id", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => User_1.User }),
    __metadata("design:type", Object)
], Post.prototype, "author", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: ['text', 'animation', 'audio', 'document', 'photo', 'video', 'voice'] }),
    __metadata("design:type", String)
], Post.prototype, "type", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Boolean)
], Post.prototype, "disable_preview", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Post.prototype, "caption", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: mongoose_1.default.Schema.Types.Mixed }),
    __metadata("design:type", Array)
], Post.prototype, "entities", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: mongoose_1.default.Schema.Types.Mixed }),
    __metadata("design:type", Array)
], Post.prototype, "buttons", void 0);
Post = __decorate([
    (0, typegoose_1.modelOptions)({ options: { allowMixed: typegoose_1.Severity.ALLOW } })
], Post);
exports.PostModel = (0, typegoose_1.getModelForClass)(Post, {
    schemaOptions: {
        timestamps: {
            createdAt: 'created_date',
            updatedAt: false
        },
        versionKey: false,
    }
});
//# sourceMappingURL=Post.js.map