import { IncomingMessage, ServerResponse } from 'http';

import HttpControllers from '../controllers/http';
import PostsControllers from '../controllers/posts';

interface Request extends IncomingMessage {
  method?: string;
  url?: string;
  on: any;
  body: any;
}

interface Response extends ServerResponse {}

const routes = async (req: Request, res: Response) => {
  const { url, method } = req;
  let body = '';
  req.on('data', (chunk: any) => {
    body += chunk;
  });
  if (url === '/posts' && method === 'GET') {
    PostsControllers.getPosts( req, res);
  } else if (url === '/posts' && method === 'POST') {
    req.on('end', () => {
      PostsControllers.createPost(req, res, body);
    });
  } else if (url === '/posts' && method === 'DELETE') {
    PostsControllers.delAllPosts(req, res);
  } else if (url?.startsWith('/posts/') && method === 'DELETE') {
    PostsControllers.delPost(req, res);
  } else if (url?.startsWith('/posts/') && method === 'PATCH') {
    req.on('end', () => {
      PostsControllers.editPost(req, res, body);
    });
  } else if (url === '/posts' && method === 'OPTIONS') {
    HttpControllers.cors(req, res);
  } else {
    HttpControllers.notFound(req, res);
  }
};

export default routes;
