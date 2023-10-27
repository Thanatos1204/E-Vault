import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req, res) {
    if (req.method === 'GET') {
      const userId = req.query.userId;
      const schemes = await fetchSchemesForUser(userId);
      res.status(200).json(schemes);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  