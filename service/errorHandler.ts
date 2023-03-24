import { ServerResponse } from 'http';
import { headers } from './headers';

const errorHandler = (res: ServerResponse, message: string): void => {
  res.writeHead(404, headers);
  res.write(
    JSON.stringify({
      status: 'false',
      message,
    })
  );
  res.end();
};

export default errorHandler;

