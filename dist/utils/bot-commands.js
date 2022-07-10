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
const logger_1 = __importDefault(require("./logger"));
const PRIVATE_CHAT_DEFAULT = {
    commands: [
        { command: 'start', description: 'Shows main menu' },
        { command: 'about', description: 'Shows bot information' },
        { command: 'sponsors', description: 'Shows sponsors list' },
    ],
    scope: { type: 'all_private_chats' },
    language_code: undefined
};
const allCommands = [
    PRIVATE_CHAT_DEFAULT
];
function setup(bot) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info('Setting up bot commands...');
        for (const { commands, scope, language_code } of allCommands) {
            yield bot.api.setMyCommands(commands, { scope, language_code });
        }
    });
}
exports.default = { setup };
//# sourceMappingURL=bot-commands.js.map