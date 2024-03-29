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
const utils_1 = require("../utils");
const bot_1 = __importDefault(require("../bot"));
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        utils_1.logger.info('Web server started...');
        const url = `${process.env.BOT_DOMAIN}/telegram/bot`;
        yield bot_1.default.api.setWebhook(url, {
            drop_pending_updates: true,
            secret_token: process.env.BOT_SECRET,
            allowed_updates: ['message', 'inline_query', 'callback_query'],
        });
        utils_1.logger.info('Webhook initialized...');
    });
}
exports.default = { setup };
//# sourceMappingURL=on-startup.js.map