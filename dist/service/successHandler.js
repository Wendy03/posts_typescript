"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const headers_1 = require("./headers");
const successHandler = (res, data) => {
    res.writeHead(200, headers_1.headers);
    res.write(JSON.stringify({
        status: 'success',
        data,
    }));
    res.end();
};
exports.default = successHandler;
