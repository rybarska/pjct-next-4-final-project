// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  // This is the response for any method on this endpoint
  response.status(200).json({ animals: 'http://localhost:3000/api/animals' });
}
