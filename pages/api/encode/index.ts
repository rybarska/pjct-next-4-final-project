// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/* execa is a wrapper for process execution. Here, it enables programatic use of the stegify encode command.
formidable is a library that allows to parse the multipart form to access the text file and the image sent from the frontend. */

import { execa, execaCommand } from 'execa';
import formidable, {
  errors as formidableErrors,
  IncomingForm,
} from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
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

    /* Here, the execaCommand enables programatic use of the stegify encode command that otherwise would work only in the command line.
    The stegify encode command specifies the parameters: carrier (image), data(text file to be hidden in the carrier image), and result (encoded steganography image). */
    async function encodeStegImage(carrier: any, data: any, result: any) {
      const { stdout } = await execaCommand(
        `stegify encode --carrier ${carrier} --data ${data} --result ${result}`,
      );
    }

    /* This is parsing the multipart form, to access the text file and the image file sent from the frontend. */
    function formidablePromise(request: NextApiRequest) {
      return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.parse(request, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });
    }

    /* Here, I call the formidablePromise function that parses the multipart form. I specify temporary filepaths for the image (carrierImageFilepath) and the text file (dataFileFilepath) sent from the frontend. I specify the filepath where the encoded steganography image (stegResultFilepath) will be saved. I call the encodeStegImage function and pass the three filepaths as arguments. */
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
