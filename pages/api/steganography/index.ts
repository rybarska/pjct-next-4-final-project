// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { execa, execaCommand } from 'execa';
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

    async function encodeStegImage(carrier, data, result) {
      const { stdout } = await execaCommand(
        `stegify encode --carrier ${carrier} --data ${data} --result ${result}`,
      );
    }

    async function decodeStegImage(carrier, result) {
      const { stdout } = await execaCommand(
        `stegify decode --carrier ${carrier} --result ${result}`,
      );
    }

    /* async function makeStegImage() {
      const { stdout } = await execaCommand(
        `stegify encode --carrier ./public/images/spaceDrone1.png --data ./public/texts/textToHide.rtf --result ./public/uploads/stegResult.png`,
      );
    } */

    function formidablePromise(request) {
      return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.parse(request, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
        /* form.on('file', function (name, file) {
          //console.log('New name ' + file.newFilename);
          //console.log('Filepath ' + file.filepath);
          //.log('Uploaded ' + file.originalFilename);
          /* return execa.command(
            `stegify encode --carrier carrierImage --data dataFile --result stegResult`,
          ); */
        /*if (file.mimetype === 'text/rtf') {
            dataFileFilepath = file.filepath;
            console.log('dataFileFilepath ' + dataFileFilepath);
          }
          if (file.mimetype === 'image/png') {
            carrierImageFilepath = file.filepath;
            console.log('carrierImageFilepath ' + carrierImageFilepath);
          } else {
            return;
          }
        }); */
      });
    }

    try {
      /*let data = '';
      request.on('data', (chunk) => {
        try {
          // console.log("To JSON : ",chunk.toJSON())
          // console.log("To String : ",chunk.toString())
          // console.log(chunk.isEncoding())
          data += chunk;
        } catch (e) {
          //console.log('Data : ', e);
        }
        //console.log(data);
      }); */
      const form = await formidablePromise(request);
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
      console.log(form, '...Form');
      /* request.on('end', () => {
        //console.log('No more data');
        //console.log('\nSerialize : ', serialize(data));
        //console.log('\nData string : ', data.toString());
        // response.status(200).json({ data: null, error: 'Success' });
      }); */

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

    /* if (!(carrierImage && dataFile)) {
      return response
        .status(400)
        .json({ message: 'GET: property carrierImage or dataFile missing' });
    } */

    //return response.status(200).json(carrierImage, dataFile);
  }

  //return response.status(400).json({ message: 'Method Not Allowed' });
}
