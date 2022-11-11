import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteIncidentById,
  getIncidentByIdAndValidSessionToken,
  updateIncidentById,
} from '../../../database/incidents';
import { getValidSessionByToken } from '../../../database/sessions';
import { validateTokenWithSecret } from '../../../utils/csrf';

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

  const incidentId = Number(request.query.incidentId);

  // check if the id is a number
  if (!incidentId) {
    return response.status(404).json({ message: 'Not a valid Id' });
  }

  if (request.method === 'GET') {
    // no validation example
    // const incident = await getIncidentById(incidentId);

    // TODO add an example of a query that requires session token validation
    const incident = await getIncidentByIdAndValidSessionToken(
      incidentId,
      request.cookies.sessionToken,
    );

    // check if incident exists on the database
    if (!incident) {
      return response
        .status(404)
        .json({ message: 'Not a valid Id or not a valid session token' });
    }

    return response.status(200).json(incident);
  }

  // prevent the endpoint to be accessed by cross site requests
  const csrfToken = request.body?.csrfToken;

  if (!(await validateTokenWithSecret(session.csrfSecret, csrfToken))) {
    return response.status(401).json({ message: 'csrf_token is not valid' });
  }

  if (request.method === 'PUT') {
    // NOT getting the id from the body since is already on the query
    const category = request.body?.category;
    const coordinates = request.body?.coordinates;
    const day = request.body?.day;

    // Check all the information to create the incident exists
    if (!(category && coordinates && day)) {
      return response
        .status(400)
        .json({ message: 'property category, coordinates or day missing' });
    }

    // TODO: add type checking to the api

    // Create the incident using the database util function
    const newIncident = await updateIncidentById(
      incidentId,
      category,
      coordinates,
      day,
    );

    if (!newIncident) {
      return response.status(404).json({ message: 'Not a valid Id' });
    }

    // response with the new created incident
    return response.status(200).json(newIncident);
  }

  if (request.method === 'DELETE') {
    const deletedIncident = await deleteIncidentById(incidentId);

    if (!deletedIncident) {
      return response.status(404).json({ message: 'Not a valid Id' });
    }

    console.log(deletedIncident);

    return response.status(200).json(deletedIncident);
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
