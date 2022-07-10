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
const bot_1 = __importDefault(require("../bot"));
const logger_1 = __importDefault(require("./logger"));
const bot_commands_1 = __importDefault(require("./bot-commands"));
const transformers_1 = __importDefault(require("../transformers"));
const middlewares_1 = __importDefault(require("../middlewares"));
const handlers_1 = __importDefault(require("../handlers"));
const database_1 = __importDefault(require("../database"));
function onStartup(botInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info('Setting up the bot...');
        yield database_1.default.setup(bot_1.default);
        yield bot_commands_1.default.setup(bot_1.default);
        yield transformers_1.default.setup(bot_1.default);
        yield middlewares_1.default.setup(bot_1.default);
        yield handlers_1.default.setup(bot_1.default);
        logger_1.default.info('Starting the bot...');
        logger_1.default.info(JSON.stringify(botInfo));
    });
}
exports.default = onStartup;
//# sourceMappingURL=on-startup.js.map