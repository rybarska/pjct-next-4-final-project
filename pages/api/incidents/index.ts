import { NextApiRequest, NextApiResponse } from 'next';
import { createIncident, getIncidents } from '../../../database/incidents';
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
    const incidents = await getIncidents();

    return response.status(200).json(incidents);
  }

  if (request.method === 'POST') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }

    const category = request.body?.category;
    const coordinates = request.body?.coordinates;
    const csrfToken = request.body?.csrfToken;

    if (!(await validateTokenWithSecret(session.csrfSecret, csrfToken))) {
      return response.status(401).json({ message: 'csrf_token is not valid' });
    }

    // Check all the information to create the incident exists
    if (!(category && coordinates)) {
      return response
        .status(400)
        .json({ message: 'property category or coordinates missing' });
    }

    // TODO: add type checking to the api

    // Create the incident using the database util function
    const newIncident = await createIncident(category, coordinates);

    // response with the new created incident
    return response.status(200).json(newIncident);
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
