import { IncomingMessage, ServerResponse } from 'http';
import { headers } from '../service/headers';
const http = {
  cors(req: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, headers);
    res.end();
  },
  notFound(req: IncomingMessage, res: ServerResponse) {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: 'false',
        message: '無此網站路由',
      })
    );
    res.end();
  },
};

export default http;
