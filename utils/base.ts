import { NextApiRequest, NextApiResponse } from 'next';
import nc, { NextConnect } from 'next-connect';

export class BackendError extends Error {
  constructor(public code: number, message: string, public error: any) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class BackendErrorResponse {
  constructor(public message: string, public error?: string) {}
}

export const baseHandler = (): NextConnect<NextApiRequest, NextApiResponse> => {
  return nc<NextApiRequest, NextApiResponse>({
    attachParams: true,
    onError: (err, req, res, _next) => {
      if (err instanceof BackendError) {
        return res.status(err.code).json(new BackendErrorResponse(err.message, err.error));
      }
      res.status(500).json(new BackendErrorResponse(err.message));
    },
  });
};

export const appendFallbackHandler = (handler: NextConnect<NextApiRequest, NextApiResponse>) => {
  handler.all(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(405).json(new BackendErrorResponse('NextJS API Method Not Impleneted'));
  });
};
