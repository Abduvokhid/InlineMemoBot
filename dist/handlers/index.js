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
const filters_1 = require("../filters");
const handle_messages_1 = __importDefault(require("./handle-messages"));
const handle_inline_1 = __importDefault(require("./handle-inline"));
const handle_query_1 = __importDefault(require("./handle-query"));
function setup(bot) {
    return __awaiter(this, void 0, void 0, function* () {
        utils_1.logger.info('Setting up handlers...');
        yield handle_query_1.default.setup(bot);
        yield handle_inline_1.default.setup(bot);
        yield handle_messages_1.default.setup(bot.filter(filters_1.isPrivate));
    });
}
exports.default = { setup };
//# sourceMappingURL=index.js.map