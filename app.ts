import { IncomingMessage, ServerResponse } from 'http';
import routes from './routes';

interface Request extends IncomingMessage {
  body: any;
}

const app = async (req: IncomingMessage, res: ServerResponse) => {
  routes(req as Request, res);
};

export default app;
