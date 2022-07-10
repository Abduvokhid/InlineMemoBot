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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `${__dirname}/../.env` });
const grammy_1 = require("grammy");
const utils_1 = require("./utils");
const token = process.env.BOT_TOKEN;
if (!token)
    throw new Error('Bot token is required!');
const bot = new grammy_1.Bot(token);
process.once('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    utils_1.logger.info('SIGINT');
    yield (0, utils_1.onShutdown)(bot);
}));
process.once('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () {
    utils_1.logger.info('SIGTERM');
    yield (0, utils_1.onShutdown)(bot);
}));
bot.init().then(_ => {
    (0, utils_1.onStartup)(bot.botInfo).then();
});
exports.default = bot;
//# sourceMappingURL=bot.js.map