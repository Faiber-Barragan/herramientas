import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
  
      if (id) {
        const review = await prisma.review.findUnique({
          where: { id: parseInt(id) },
        });
        return NextResponse.json(review, { status: 200 });
      } else {
        const reviews = await prisma.review.findMany();
        return NextResponse.json(reviews, { status: 200 });
      }
    } catch (error) {
      console.error('Error fetching review', error);
      return NextResponse.json({ message: 'Error fetching review' }, { status: 500 });
    }
}
  
export async function POST(req) {
    try {
        const data = await req.json();
        const newReview = await prisma.review.create({
        data: {
            ...data,
        },
        });
        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        console.error('Error creating review', error);
        return NextResponse.json({ message: 'Error creating review' }, { status: 500 });
    }
}
  
export async function PUT(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const data = await req.json();

        const updatedReview = await prisma.review.update({
        where: { id: parseInt(id) },
        data: {
            ...data,
        },
        });
        return NextResponse.json(updatedReview, { status: 200 });
    } catch (error) {
        console.error('Error updating review', error);
        return NextResponse.json({ message: 'Error updating review' }, { status: 500 });
    }
}
  
export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        await prisma.review.delete({
        where: { id: parseInt(id) },
        });
        return NextResponse.json({}, { status: 204 });
    } catch (error) {
        console.error('Error deleting review', error);
        return NextResponse.json({ message: 'Error deleting review' }, { status: 500 });
    }
}
