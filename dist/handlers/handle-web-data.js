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
Object.defineProperty(exports, "__esModule", { value: true });
const misc_1 = require("../utils/misc");
function handleWebData(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const { web_app_data } = ctx.message;
        const data = JSON.parse(web_app_data.data);
        const button = Object.assign({}, data);
        const { buttons } = ctx.session.post;
        if (buttons[data.row])
            buttons[data.row].push(button);
        else
            buttons[data.row] = [button];
        yield ctx.api.editMessageReplyMarkup(ctx.chat.id, parseInt(ctx.session.post.preview_id), { reply_markup: (0, misc_1.generateKeyboard)(buttons) });
    });
}
exports.default = handleWebData;
//# sourceMappingURL=handle-web-data.js.map