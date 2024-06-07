import { prisma } from '@/libs/prisma'

export async function findUserByEmail(email) {
    try {
      const usuario = await prisma.user.findUnique({
        where: {
          email: email
        }
      });

      return usuario;
    } catch (error) {
      console.error('User not found:', error);
      return null;
    }
}

export async function createUser(data) {
    const usuario = await prisma.user.create({ data: data });

    return usuario;
}

