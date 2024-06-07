import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
  
      if (id) {
        const transaction = await prisma.transaction.findUnique({
          where: { id: parseInt(id) },
        });
        return NextResponse.json(transaction, { status: 200 });
      } else {
        const transactions = await prisma.transaction.findMany();
        return NextResponse.json(transactions, { status: 200 });
      }
    } catch (error) {
      console.error('Error fetching transaction', error);
      return NextResponse.json({ message: 'Error fetching transaction' }, { status: 500 });
    }
}
  
export async function POST(req) {
    try {
        const data = await req.json();
        const newTransaction = await prisma.transaction.create({
            data: {
                ...data,
            },
        });
        return NextResponse.json(newTransaction, { status: 201 });
    } catch (error) {
        console.error('Error creating transaction', error);
        return NextResponse.json({ message: 'Error creating transaction' }, { status: 500 });
    }
}
  
export async function PUT(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const data = await req.json();

        const updatedTransaction = await prisma.transaction.update({
            where: { id: parseInt(id) },
                data: {
                    ...data,
                },
        });
        return NextResponse.json(updatedTransaction, { status: 200 });
    } catch (error) {
        console.error('Error updating transaction', error);
        return NextResponse.json({ message: 'Error updating transaction' }, { status: 500 });
    }
}
  
export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        await prisma.transaction.delete({
            where: { id: parseInt(id) },
        });
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error('Error deleting transaction', error);
        return NextResponse.json({ message: 'Error deleting transaction' }, { status: 500 });
    }
}
