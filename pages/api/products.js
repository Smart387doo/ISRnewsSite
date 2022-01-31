import prisma from "../../lib/prisma";

export default async function handler(req, res) {

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error fetching posts' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
