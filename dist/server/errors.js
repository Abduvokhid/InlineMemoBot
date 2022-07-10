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
const grammy_1 = require("grammy");
const utils_1 = require("../utils");
function botErrorHandler(err) {
    return __awaiter(this, void 0, void 0, function* () {
        const e = err.error;
        if (e instanceof grammy_1.BotError) {
            utils_1.logger.error(`Error in bot: ${e.ctx}`);
        }
        else if (e instanceof grammy_1.GrammyError) {
            utils_1.logger.error(`Error in request: ${e.description}`);
            if (e.description.includes('can\'t parse entities')) {
                const { errors } = err.ctx.state.translation;
                yield err.ctx.reply(errors.invalid_tags);
            }
        }
        else if (e instanceof grammy_1.HttpError) {
            utils_1.logger.error(`Could not contact Telegram: ${e}`);
        }
        else {
            utils_1.logger.error(`Unknown error: ${e}`);
            console.error(e);
        }
    });
}
process.on('uncaughtException', (error) => __awaiter(void 0, void 0, void 0, function* () {
    utils_1.logger.info('Thrown uncaughtException!');
    if (error instanceof grammy_1.BotError)
        yield botErrorHandler(error);
    else
        utils_1.logger.error(error);
}));
process.on('unhandledRejection', (error) => __awaiter(void 0, void 0, void 0, function* () {
    utils_1.logger.info('Thrown unhandledRejection!');
    if (error instanceof grammy_1.BotError)
        yield botErrorHandler(error);
    else
        utils_1.logger.error(error);
}));
function setup(app) {
}
exports.default = { setup };
//# sourceMappingURL=errors.js.map