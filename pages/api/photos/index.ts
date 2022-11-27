import { NextApiRequest, NextApiResponse } from 'next';
import { createPhoto, getPhotos } from '../../../database/photos';
import { getValidSessionByToken } from '../../../database/sessions';
import { validateTokenWithSecret } from '../../../utils/csrf';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  console.log('session is passed', request.cookies.sessionToken);

  const session =
    request.cookies.sessionToken &&
    (await getValidSessionByToken(request.cookies.sessionToken));

  if (!session) {
    response
      .status(400)
      .json({ errors: [{ message: 'No valid session token passed' }] });
    return;
  }

  if (request.method === 'GET') {
    const photos = await getPhotos();

    return response.status(200).json(photos);
  }

  if (request.method === 'POST') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }

    const title = request.body?.title;

    const csrfToken = request.body?.csrfToken;

    if (!(await validateTokenWithSecret(session.csrfSecret, csrfToken))) {
      return response.status(401).json({ message: 'csrf_token is not valid' });
    }

    // Check all the information to create the photos exists
    if (!title) {
      return response.status(400).json({ message: 'property title missing' });
    }

    // TODO: add type checking to the api

    // Create the photo using the database util function
    const newPhoto = await createPhoto(title);

    // response with the new created photo
    return response.status(200).json(newPhoto);
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
