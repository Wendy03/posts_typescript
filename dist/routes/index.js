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
const http_1 = __importDefault(require("../controllers/http"));
const posts_1 = __importDefault(require("../controllers/posts"));
const routes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url, method } = req;
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    if (url === '/posts' && method === 'GET') {
        posts_1.default.getPosts(req, res);
    }
    else if (url === '/posts' && method === 'POST') {
        req.on('end', () => {
            posts_1.default.createPost(req, res, body);
        });
    }
    else if (url === '/posts' && method === 'DELETE') {
        posts_1.default.delAllPosts(req, res);
    }
    else if ((url === null || url === void 0 ? void 0 : url.startsWith('/posts/')) && method === 'DELETE') {
        posts_1.default.delPost(req, res);
    }
    else if ((url === null || url === void 0 ? void 0 : url.startsWith('/posts/')) && method === 'PATCH') {
        req.on('end', () => {
            posts_1.default.editPost(req, res, body);
        });
    }
    else if (url === '/posts' && method === 'OPTIONS') {
        http_1.default.cors(req, res);
    }
    else {
        http_1.default.notFound(req, res);
    }
});
exports.default = routes;
