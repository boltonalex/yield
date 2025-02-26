import { json } from '@sveltejs/kit';
import { bondData } from '../../../lib/data/bonds.js';

export async function GET() {
  return json(bondData);
}
