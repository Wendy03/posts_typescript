"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const headers_1 = require("../service/headers");
const http = {
    cors(req, res) {
        res.writeHead(200, headers_1.headers);
        res.end();
    },
    notFound(req, res) {
        res.writeHead(404, headers_1.headers);
        res.write(JSON.stringify({
            status: 'false',
            message: '無此網站路由',
        }));
        res.end();
    },
};
exports.default = http;
