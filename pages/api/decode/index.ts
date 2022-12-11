// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/* execa is a wrapper for process execution. Here, it enables programatic use of the stegify decode command.
formidable is a library that allows to parse the multipart form to access the steganography image sent from the frontend. */

import { execaCommand } from 'execa';
import formidable, {
  errors as formidableErrors,
  IncomingForm,
} from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { getValidSessionByToken } from '../../../database/sessions';
import { validateTokenWithSecret } from '../../../utils/csrf';

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

    /* Here, the execaCommand enables programatic use of the stegify decode command that otherwise would work only in the command line.
    The stegify decode command specifies the parameters: carrier (steganography image), and result(text file to be decoded/extracted from the carrier image). */
    async function decodeStegImage(carrier: any, result: any) {
      const { stdout } = await execaCommand(
        `stegify decode --carrier ${carrier} --result ${result}`,
      );
    }

    /* This is parsing the multipart form, to access the steganography image file sent from the frontend. */
    function formidablePromise(request: NextApiRequest) {
      return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.parse(request, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });
    }

    /* Here, I call the formidablePromise function that parses the multipart form. I specify temporary filepaths for the steganography image (carrierStegImageFilepath) sent from the frontend. I specify the filepath where the decoded text file (decodedTextFilepath) will be saved. I call the decodeStegImage function and pass the two filepaths as arguments. */
    try {
      const form: any = await formidablePromise(request);
      const carrierStegImageFilepath = form.files.myStegImage.filepath;
      const decodedTextFilepath = './public/uploads/decodedText.rtf';
      const decodedText = await decodeStegImage(
        carrierStegImageFilepath,
        decodedTextFilepath,
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
