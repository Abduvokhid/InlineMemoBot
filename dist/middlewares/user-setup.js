"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const translation_1 = __importDefault(require("../translation"));
const generators_1 = require("../utils/generators");
function userSetup(ctx, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        ctx.session.language = ((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.language_code) || 'en';
        ctx.state = {};
        let user = yield User_1.UserModel.findOne({ telegram_id: ctx.from.id });
        if (!user) {
            user = new User_1.UserModel({ telegram_id: ctx.from.id });
        }
        user.last_access_date = new Date();
        user.language = ctx.session.language;
        yield user.save();
        ctx.state.user = user;
        ctx.state.translation = translation_1.default[user.language] || translation_1.default.en;
        if (!ctx.session.credentials || ctx.session.credentials.valid_until < new Date(Date.now() + 3600000)) {
            ctx.session.credentials = {
                token: (0, generators_1.generateString)(32),
                valid_until: new Date(Date.now() + 86400000)
            };
        }
        yield next();
    });
}
exports.default = userSetup;
//# sourceMappingURL=user-setup.js.map