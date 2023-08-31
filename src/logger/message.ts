import { EOL } from 'os';
import { Request } from 'express';

export const getMessage = ({ path, query, body, method, status }): string => {
  const message = `Url: ${path},${EOL}Query: ${JSON.stringify(
    query,
  )},${EOL},${EOL}Status code: ${status},${EOL}, Body: ${JSON.stringify(
    body,
  )}Method: ${method},${EOL}`;

  return message + EOL;
};

export const getErrorData = async (
  statusCode: number,
  error: string,
  { path, method }: Request,
) => {
  return {
    statusCode,
    error,
    path,
    method,
    timestamp: new Date(),
  };
};
