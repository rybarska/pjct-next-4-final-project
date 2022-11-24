import { ProgressBar } from '@open-tech-world/cli-progress-bar';
import { load } from 'cheerio';
import { execa, execaCommand } from 'execa';
import { promises as fs } from 'fs';
import httpProxy from 'http-proxy';
import { NextApiRequest, NextApiResponse } from 'next';
import { deserialize, serialize } from 'v8';
import {
  deletePhotoById,
  getPhotoByIdAndValidSessionToken,
  updatePhotoById,
} from '../../../database/photos';
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

  const photoId = Number(request.query.photoId);

  // check if the id is a number
  if (!photoId) {
    return response.status(404).json({ message: 'Not a valid Id' });
  }

  const linkResponse = await fetch(`/photos/{photo.id}`);
  const body = await linkResponse.text();

  const downloadImage = async (url: any, path: any) => {
    const imageResponse = await fetch(url);
    const arraybuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arraybuffer);
    fs.writeFile(path, buffer, () => {});
  };

  const $ = load(body);

  /* const uploadsArray = [];

for (let i = 0; i < 10; i++) {
    uploadsArray.push($('div > a > img')[i].attribs.src);
    await downloadImage(uploadsArray[i], `./uploads/${i + 1}.jpg`);
  } */

  const pBar = new ProgressBar({ prefix: 'Downloading' });
  pBar.run({ value: 0, total: 100 });
  pBar.run({ value: 50, total: 100 });
  pBar.run({ value: 100, total: 100, prefix: 'Download Completed!' });

  try {
    const downloadURL = '/photos/{photo.id}';
    const downloadFilepath = './public/uploads/{photo.title}{photo.id}.png';
    downloadImage(downloadURL, downloadFilepath);
  } catch (e) {
    console.log('Error message : ', e);
    response.status(400).json({ data: null, error: 'Invalid Method' });
    return;
  }

  if (request.method === 'GET') {
    // no validation example
    // const photo = await getPhotoById(photoId);

    // TODO add an example of a query that requires session token validation
    const photo = await getPhotoByIdAndValidSessionToken(
      photoId,
      request.cookies.sessionToken,
    );

    // check if photo exists on the database
    if (!photo) {
      return response
        .status(404)
        .json({ message: 'Not a valid Id or not a valid session token' });
    }

    return response.status(200).json(photo);
  }

  // prevent the endpoint to be accessed by cross site requests
  const csrfToken = request.body?.csrfToken;

  if (!(await validateTokenWithSecret(session.csrfSecret, csrfToken))) {
    return response.status(401).json({ message: 'csrf_token is not valid' });
  }

  if (request.method === 'PUT') {
    // NOT getting the id from the body since is already on the query
    const title = request.body?.title;

    // Check all the information to create the photo exists
    if (!(firstName && accessory && type)) {
      return response
        .status(400)
        .json({ message: 'property firstName, accessory or type missing' });
    }

    // TODO: add type checking to the api

    // Create the photo using the database util function
    const newPhoto = await updatePhotoById(photoId, title);

    if (!newPhoto) {
      return response.status(404).json({ message: 'Not a valid Id' });
    }

    // response with the new created photo
    return response.status(200).json(newPhoto);
  }

  if (request.method === 'DELETE') {
    const deletedPhoto = await deletePhotoById(photoId);

    if (!deletedPhoto) {
      return response.status(404).json({ message: 'Not a valid Id' });
    }

    console.log(deletedPhoto);

    return response.status(200).json(deletedPhoto);
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
