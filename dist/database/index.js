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
const mongoose_1 = __importDefault(require("mongoose"));
const grammy_1 = require("grammy");
const storage_mongodb_1 = require("@grammyjs/storage-mongodb");
function setup(bot) {
    return __awaiter(this, void 0, void 0, function* () {
        utils_1.logger.info('Connecting to database...');
        const uri = process.env.MONGO_URI;
        if (!uri)
            throw new Error('Mongo URI is required!');
        yield mongoose_1.default.connect(uri);
        utils_1.logger.info('Connected to database...');
        yield sessionSetup(bot);
    });
}
function sessionSetup(bot) {
    return __awaiter(this, void 0, void 0, function* () {
        const collection = mongoose_1.default.connection.db.collection('sessions');
        bot.use((0, grammy_1.session)({
            initial: () => ({
                step: 'home'
            }),
            storage: new storage_mongodb_1.MongoDBAdapter({ collection })
        }));
        utils_1.logger.info('Session initialized...');
    });
}
exports.default = { setup };
//# sourceMappingURL=index.js.map