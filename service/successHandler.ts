import { ServerResponse } from 'http';
import { headers } from './headers';

const successHandler = (res: ServerResponse, data: any) => {
  res.writeHead(200, headers);
  res.write(
    JSON.stringify({
      status: 'success',
      data,
    })
  );
  res.end();
};

export default successHandler;
