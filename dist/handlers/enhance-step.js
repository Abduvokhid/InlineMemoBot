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
const send_preview_1 = __importDefault(require("../library/states/send-preview"));
const validators_1 = require("../utils/validators");
function enhanceStep(ctx) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const { text } = ctx.message;
        if (!text)
            return yield ctx.deleteMessage();
        const lines = text.split('\n');
        const buttons = [];
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            const items = line.match(/\[(.*?)\]/g);
            if (items) {
                for (let item of items) {
                    item = item.replace('[', '').trim();
                    item = item.replace(']', '').trim();
                    const details = item.split('+');
                    const text = details[0].trim();
                    const url = details[1].trim();
                    if ((0, validators_1.validateUrl)(url)) {
                        if (!buttons[i])
                            buttons.push([]);
                        buttons[i].push({
                            type: 'link',
                            name: text,
                            link: url
                        });
                    }
                }
            }
        }
        if (buttons.length > 0)
            ctx.session.post.buttons = buttons;
        try {
            if ((_a = ctx.session.post) === null || _a === void 0 ? void 0 : _a.settings_id)
                yield ctx.api.deleteMessage(ctx.chat.id, parseInt(ctx.session.post.settings_id));
            if ((_b = ctx.session.post) === null || _b === void 0 ? void 0 : _b.preview_id)
                yield ctx.api.deleteMessage(ctx.chat.id, parseInt(ctx.session.post.preview_id));
        }
        catch (e) {
            console.error(e, e.stack);
        }
        yield (0, send_preview_1.default)(ctx);
    });
}
exports.default = enhanceStep;
//# sourceMappingURL=enhance-step.js.map