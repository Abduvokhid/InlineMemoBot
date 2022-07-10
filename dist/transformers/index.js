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
const hydrate_1 = require("@grammyjs/hydrate");
const parse_mode_1 = require("@grammyjs/parse-mode");
const utils_1 = require("../utils");
const logging_api_calls_1 = __importDefault(require("./logging-api-calls"));
function setup(bot) {
    return __awaiter(this, void 0, void 0, function* () {
        utils_1.logger.info('Setting up API transformers...');
        bot.api.config.use(logging_api_calls_1.default);
        bot.api.config.use((0, hydrate_1.hydrateApi)());
        bot.api.config.use((0, parse_mode_1.parseMode)('HTML'));
    });
}
exports.default = { setup };
//# sourceMappingURL=index.js.map