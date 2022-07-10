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
exports.SessionModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const mongoose_1 = __importDefault(require("mongoose"));
let Session = class Session {
};
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true, index: true }),
    __metadata("design:type", String)
], Session.prototype, "key", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: mongoose_1.default.Schema.Types.Mixed }),
    __metadata("design:type", Object)
], Session.prototype, "value", void 0);
Session = __decorate([
    (0, typegoose_1.modelOptions)({ options: { allowMixed: typegoose_1.Severity.ALLOW } })
], Session);
exports.SessionModel = (0, typegoose_1.getModelForClass)(Session, {
    schemaOptions: {
        timestamps: false,
        versionKey: false,
    }
});
//# sourceMappingURL=Session.js.map