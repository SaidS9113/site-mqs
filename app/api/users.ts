import { prisma } from '@/lib/db/prisma'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const users = await prisma.user.findMany()
  res.status(200).json(users)
}
