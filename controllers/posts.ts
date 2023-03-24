import { IncomingMessage, ServerResponse } from 'http';
import Post from '../models/post';
import errorHandler from '../service/errorHandler';
import successHandler from '../service/successHandler';

interface Request extends IncomingMessage {
  body: any;
}

const posts = {
  async getPosts(req: IncomingMessage, res: ServerResponse) {
    const posts = await Post.find();
    successHandler(res, posts);
  },
  async createPost(req: IncomingMessage, res: ServerResponse, body: string) {
    try {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', async () => {
        const data = JSON.parse(body);
        const { name, content, image, createdAt } = data;
        const newPost = await Post.create({
          name,
          content,
          image,
          createdAt,
        });
        successHandler(res, newPost);
      });
    } catch (err) {
      errorHandler(res, '資料錯誤');
    }
  },
  async delAllPosts(req: IncomingMessage, res: ServerResponse) {
    const posts = await Post.deleteMany({});
    successHandler(res, posts);
  },
  async delPost(req: IncomingMessage, res: ServerResponse) {
    const id = req.url?.split('/').pop();
    const posts = await Post.findByIdAndDelete(id);
    successHandler(res, posts);
  },
  async editPost(req: IncomingMessage, res: ServerResponse, body: string) {
    try {
      const id = req.url?.split('/').pop();
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', async () => {
        const data = JSON.parse(body);
        const { content, image, likes } = data;
        const posts = await Post.findByIdAndUpdate(id, {
          $set: {
            content,
            image,
            likes,
          },
        });
        successHandler(res, posts);
      });
    } catch {
      errorHandler(res, '查無此id');
    }
  },
};

export default posts;
