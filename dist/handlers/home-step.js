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
exports.homeText = void 0;
const commands_1 = require("../library/commands");
const create_post_1 = __importDefault(require("../library/states/create-post"));
const post_step_1 = __importDefault(require("./post-step"));
function homeText(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const { menu } = ctx.state.translation;
        switch (ctx.message.text) {
            case menu.create_post:
                yield (0, create_post_1.default)(ctx);
                break;
            case menu.sponsors:
                yield (0, commands_1.sponsors)(ctx);
                break;
            case menu.about_us:
                yield (0, commands_1.about)(ctx);
                break;
            default:
                yield (0, post_step_1.default)(ctx);
                break;
        }
    });
}
exports.homeText = homeText;
//# sourceMappingURL=home-step.js.map