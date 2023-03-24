"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const headers_1 = require("./headers");
const errorHandler = (res, message) => {
    res.writeHead(404, headers_1.headers);
    res.write(JSON.stringify({
        status: 'false',
        message,
    }));
    res.end();
};
exports.default = errorHandler;
