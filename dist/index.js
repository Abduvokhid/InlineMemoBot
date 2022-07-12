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
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const grammy_1 = require("grammy");
const bot_1 = __importDefault(require("./bot"));
const middlewares_1 = __importDefault(require("./server/middlewares"));
const on_startup_1 = __importDefault(require("./server/on-startup"));
const add_button_1 = __importDefault(require("./server/add-button"));
const utils_1 = require("./utils");
const app = (0, express_1.default)();
middlewares_1.default.setup(app);
app.post('/telegram/bot', (0, grammy_1.webhookCallback)(bot_1.default, 'express', { secretToken: process.env.BOT_SECRET }));
app.post('/buttons/add', add_button_1.default);
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
app.use((err, req, res, _) => __awaiter(void 0, void 0, void 0, function* () {
    if (err instanceof grammy_1.BotError) {
        utils_1.logger.info('Thrown BotError exception!');
        yield botErrorHandler(err);
        res.status(200).send({});
    }
    else {
        utils_1.logger.info('Thrown Express exception!');
        res.status(500).send({ error: 'Something went wrong' });
    }
}));
app.listen(process.env.PORT || 5000, on_startup_1.default.setup);
//# sourceMappingURL=index.js.map