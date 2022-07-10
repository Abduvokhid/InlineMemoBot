"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
function setup(app) {
    app.use((0, cors_1.default)({
        origin: '*',
        methods: 'post'
    }));
    app.use(express_1.default.json());
}
exports.default = { setup };
//# sourceMappingURL=middewares.js.map