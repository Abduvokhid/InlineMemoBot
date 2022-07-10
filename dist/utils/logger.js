"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    level: 'info',
    transports: [
        new winston_1.transports.Console({
            format: winston_1.format.simple(),
        })
    ],
    exitOnError: true,
});
exports.default = logger;
//# sourceMappingURL=logger.js.map