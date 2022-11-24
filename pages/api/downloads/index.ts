// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ProgressBar } from '@open-tech-world/cli-progress-bar';
import { load } from 'cheerio';
import { execa, execaCommand } from 'execa';
import { promises as fs } from 'fs';
import httpProxy from 'http-proxy';
import { NextApiRequest, NextApiResponse } from 'next';
import { deserialize, serialize } from 'v8';
import { getValidSessionByToken } from '../../../database/sessions';

} from 'formidable';

/*export const config = {
  api: {
    bodyParser: false,
  },
}; */

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

    const linkResponse = await fetch(
      `/photos/{photo.id}`,
    );
    const body = await linkResponse.text();

    const downloadImage = async (url:any, path:any) => {
      const imageResponse = await fetch(url);
      const arraybuffer = await imageResponse.arrayBuffer();
      const buffer = Buffer.from(arraybuffer);
      fs.writeFile(path, buffer, () => {});
    };

    const $ = load(body);

const uploadsArray = [];

for (let i = 0; i < 10; i++) {
  uploadsArray.push($('div > a > img')[i].attribs.src);
  await downloadImage(uploadsArray[i], `./uploads/${i + 1}.jpg`);
}

const pBar = new ProgressBar({ prefix: 'Downloading' });
pBar.run({ value: 0, total: 100 });
pBar.run({ value: 50, total: 100 });
pBar.run({ value: 100, total: 100, prefix: 'Download Completed!' });

    /* try {
      const downloadURL = '/photos/{photo.id}'
      const downloadFilepath = './public/uploads/{photo.title}{photo.id}.png';
      downloadImage(downloadURL, downloadFilepath)
    } catch (e) {
      console.log('Error message : ', e);
      response.status(400).json({ data: null, error: 'Invalid Method' });
      return;
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
