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
const create_post_1 = __importDefault(require("../library/states/create-post"));
const remove_caption_1 = __importDefault(require("../library/states/remove-caption"));
const confirm_post_1 = __importDefault(require("../library/states/confirm-post"));
function enhanceStep(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const { buttons } = ctx.state.translation;
        const { text } = ctx.message;
        switch (text) {
            case buttons.go_back:
                yield (0, create_post_1.default)(ctx);
                break;
            case buttons.remove_caption:
                yield (0, remove_caption_1.default)(ctx);
                break;
            case buttons.confirm_post:
                yield (0, confirm_post_1.default)(ctx);
                break;
            default:
                yield ctx.deleteMessage();
        }
    });
}
exports.default = enhanceStep;
//# sourceMappingURL=enhance-step.js.map