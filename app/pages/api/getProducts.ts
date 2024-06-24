import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchProducts} from '@/app/lib/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    console.log("entra al get");
    try {
      
        const product = await fetchProducts();
        if (product) {
          res.status(200).json(JSON.stringify(product));
        } 
        else {
          res.status(404).json({ error: 'No se encontraron productos para la marca.' });
        }
    } catch (err) {
      res.status(500).json({ error: 'Algo salió mal al intentar obtener los datos.' });
    }
  } 
  else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
