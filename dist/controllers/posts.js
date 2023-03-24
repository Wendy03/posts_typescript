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
const post_1 = __importDefault(require("../models/post"));
const errorHandler_1 = __importDefault(require("../service/errorHandler"));
const successHandler_1 = __importDefault(require("../service/successHandler"));
const posts = {
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield post_1.default.find();
            (0, successHandler_1.default)(res, posts);
        });
    },
    createPost(req, res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk;
                });
                req.on('end', () => __awaiter(this, void 0, void 0, function* () {
                    const data = JSON.parse(body);
                    const { name, content, image, createdAt } = data;
                    const newPost = yield post_1.default.create({
                        name,
                        content,
                        image,
                        createdAt,
                    });
                    (0, successHandler_1.default)(res, newPost);
                }));
            }
            catch (err) {
                (0, errorHandler_1.default)(res, '資料錯誤');
            }
        });
    },
    delAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield post_1.default.deleteMany({});
            (0, successHandler_1.default)(res, posts);
        });
    },
    delPost(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const id = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split('/').pop();
            const posts = yield post_1.default.findByIdAndDelete(id);
            (0, successHandler_1.default)(res, posts);
        });
    },
    editPost(req, res, body) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split('/').pop();
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk;
                });
                req.on('end', () => __awaiter(this, void 0, void 0, function* () {
                    const data = JSON.parse(body);
                    const { content, image, likes } = data;
                    const posts = yield post_1.default.findByIdAndUpdate(id, {
                        $set: {
                            content,
                            image,
                            likes,
                        },
                    });
                    (0, successHandler_1.default)(res, posts);
                }));
            }
            catch (_b) {
                (0, errorHandler_1.default)(res, '查無此id');
            }
        });
    },
};
exports.default = posts;
