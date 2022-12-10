// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as Sentry from '@sentry/browser';
import { BrowserTracing } from '@sentry/tracing';
import { execa, execaCommand } from 'execa';
import formidable, {
  errors as formidableErrors,
  IncomingForm,
} from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { getValidSessionByToken } from '../../../database/sessions';

Sentry.init({
  dsn: 'https://5c38610a970e4804a999a672e43051bd@o4504306751897600.ingest.sentry.io/4504306756091904',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// import { validateTokenWithSecret } from '../../../utils/csrf';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const session =
    request.cookies.sessionToken &&
    (await getValidSessionByToken(request.cookies.sessionToken));

  if (!session) {
    response
      .status(400)
      .json({ errors: [{ message: 'No valid session token passed' }] });
    return;
  }

  if (request.method === 'POST') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }

    async function encodeStegImage(carrier: any, data: any, result: any) {
      const { stdout } = await execaCommand(
        `stegify encode --carrier ${carrier} --data ${data} --result ${result}`,
      );
    }

    async function decodeStegImage(carrier: any, result: any) {
      const { stdout } = await execaCommand(
        `stegify decode --carrier ${carrier} --result ${result}`,
      );
    }

    function formidablePromise(request: NextApiRequest) {
      return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.parse(request, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });
    }

    try {
      const form: any = await formidablePromise(request);
      const carrierImageFilepath = form.files.myImage.filepath;
      const dataFileFilepath = form.files.myText.filepath;
      const stegResultFilepath = './public/uploads/stegResult.png';
      console.log('dataFileFilepath ' + dataFileFilepath);
      console.log('carrierImageFilepath ' + carrierImageFilepath);
      const stegImage = await encodeStegImage(
        carrierImageFilepath,
        dataFileFilepath,
        stegResultFilepath,
      );
    } catch (e) {
      console.log('Error message : ', e);
      response.status(400).json({ data: null, error: 'Invalid Method' });
      return;
    }

    return response.status(200).json('POST: say something');
  }

  if (request.method === 'GET') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }
    return response.status(200).json('GET: say something');
  }
  return response.status(400).json({ message: 'Method Not Allowed' });
}
