"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onStartup = exports.onShutdown = exports.logger = void 0;
const logger_1 = __importDefault(require("./logger"));
exports.logger = logger_1.default;
const on_shutdown_1 = __importDefault(require("./on-shutdown"));
exports.onShutdown = on_shutdown_1.default;
const on_startup_1 = __importDefault(require("./on-startup"));
exports.onStartup = on_startup_1.default;
//# sourceMappingURL=index.js.map