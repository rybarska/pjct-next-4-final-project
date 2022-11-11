// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import { getValidSessionByToken } from '../../../database/sessions';

// import { validateTokenWithSecret } from '../../../utils/csrf';

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

    const carrierImage = request.body?.carrierImage;
    const dataFile = request.body?.dataFile;
    /* const csrfToken = request.body?.csrfToken; */

    console.log(carrierImage);
    console.log(dataFile);

    /* if (!(await validateTokenWithSecret(session.csrfSecret, csrfToken))) {
      return response.status(401).json({ message: 'csrf_token is not valid' });
    } */

    if (!(carrierImage && dataFile)) {
      return response
        .status(400)
        .json({ message: 'POST: property carrierImage or dataFile missing' });
    }

    /* const stegResult = await encode(carrierImage, dataFile);
    return response.status(200).json(stegResult); */

    return response.status(200).json(carrierImage);
  }

  if (request.method === 'GET') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }
    const carrierImage = request.body?.carrierImage;
    const dataFile = request.body?.dataFile;

    if (!(carrierImage && dataFile)) {
      return response
        .status(400)
        .json({ message: 'GET: property carrierImage or dataFile missing' });
    }

    return response.status(200).json(carrierImage);
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
