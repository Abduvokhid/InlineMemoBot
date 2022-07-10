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
const commands_1 = require("../library/commands");
const router_1 = require("@grammyjs/router");
const home_step_1 = require("./home-step");
const post_step_1 = __importDefault(require("./post-step"));
const enhance_step_1 = __importDefault(require("./enhance-step"));
function setup(bot) {
    return __awaiter(this, void 0, void 0, function* () {
        bot.command('start', commands_1.start);
        bot.command('help', commands_1.about);
        bot.command('sponsors', commands_1.sponsors);
        const router = new router_1.Router((ctx) => ctx.session.step);
        const main = router.route('home');
        main.on('message:text', home_step_1.homeText);
        main.on('message', post_step_1.default);
        const post = router.route('create_post');
        post.on('message', post_step_1.default);
        const enhance = router.route('enhance_post');
        enhance.on('message:text', enhance_step_1.default);
        enhance.on('message', (ctx) => __awaiter(this, void 0, void 0, function* () { return yield ctx.deleteMessage(); }));
        router.otherwise(commands_1.start);
        bot.use(router);
    });
}
exports.default = { setup };
//# sourceMappingURL=handle.js.map