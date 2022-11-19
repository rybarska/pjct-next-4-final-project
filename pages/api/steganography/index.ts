// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { execa } from 'execa';
import FormData from 'form-data';
import formidable, {
  BufferEncoding,
  errors as formidableErrors,
  IncomingForm,
} from 'formidable';
import { promises as fs } from 'fs';
import httpProxy from 'http-proxy';
import { NextApiRequest, NextApiResponse } from 'next';
import { deserialize, serialize } from 'v8';
import { getValidSessionByToken } from '../../../database/sessions';

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

    // const form = new formidable.IncomingForm();
    /* form.parse(request, async function(err, fields, files) => {
    const response = await client.assets.upload('image', carrierImage, {contentType: carrierImage.mimetype, filename: carrierImage.originalFilename});
    console.log(response);
    }) */

    try {
      let data = '';
      request.on('data', (chunk) => {
        try {
          //console.log("To JSON : ",chunk.toJSON())
          //console.log("To String : ",chunk.toString())
          //console.log(chunk.isEncoding())
          data += chunk;
        } catch (e) {
          console.log('Data : ', e);
        }
        //console.log(data);
      });
      let carrierImage;
      let dataFile;
      request.on('end', () => {
        console.log('No more data');
        //console.log('\nSerialize : ', serialize(data));
        //console.log('\nData string : ', data.toString());
        const stringifiedData = data.toString().slice(42);
        const beginningFile1 = stringifiedData.indexOf('Content-Type');
        const endingFile1 = stringifiedData.indexOf('------Web');
        const file1 = stringifiedData.slice(beginningFile1, endingFile1);
        const dataWithoutFirstFile = stringifiedData.slice(endingFile1 + 42);
        console.log(dataWithoutFirstFile);
        const beginningFile2 = dataWithoutFirstFile.indexOf('Content-Type');
        const endingFile2 = dataWithoutFirstFile.indexOf('------Web');
        const file2 = dataWithoutFirstFile.slice(beginningFile2, endingFile2);
        console.log('file 2', file2);
        carrierImage = file1;
        dataFile = file2;
        console.log(carrierImage, dataFile);

        return { carrierImage, dataFile };
        // response.status(200).json({ data: null, error: 'Success' });
      });

      //res.status(200).json({ data: null, error: "Success1" });
    } catch (e) {
      console.log('Error message : ', e);
      response.status(400).json({ data: null, error: 'Invalid Method' });
      return;
    }

    // console.log(carrierImage, dataFile);

    /* const carrierImage = request.body?.carrierImage;
    const dataFile = request.body?.dataFile; */

    /* const csrfToken = request.body?.csrfToken; */

    /* if (!(await validateTokenWithSecret(session.csrfSecret, csrfToken))) {
      return response.status(401).json({ message: 'csrf_token is not valid' });
    } */

    /* if (!(carrierImage && dataFile)) {
      return response
        .status(400)
        .json({ message: 'POST: property carrierImage or dataFile missing' });
    } */

    /* const stegResult = await encode(carrierImage, dataFile);
    return response.status(200).json(stegResult); */

    return response.status(200).json('POST: say something');
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

    /* if (!(carrierImage && dataFile)) {
      return response
        .status(400)
        .json({ message: 'GET: property carrierImage or dataFile missing' });
    } */

    return response.status(200).json(carrierImage, dataFile);
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
