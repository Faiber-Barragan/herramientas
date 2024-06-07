import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const active = await prisma.active.findUnique({
        where: { id: parseInt(id) },
      });
      return NextResponse.json(active, { status: 200 });
    } else {
      const actives = await prisma.active.findMany();
      return NextResponse.json(actives, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching active', error);
    return NextResponse.json({ message: 'Error fetching active' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const newActive = await prisma.active.create({
      data: {
        ...data,
      },
    });
    return NextResponse.json(newActive, { status: 201 });
  } catch (error) {
    console.error('Error creating active', error);
    return NextResponse.json({ message: 'Error creating active' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const data = await req.json();

    const updatedActive = await prisma.active.update({
      where: { id: parseInt(id) },
      data: {
        ...data,
      },
    });
    return NextResponse.json(updatedActive, { status: 200 });
  } catch (error) {
    console.error('Error updating active', error);
    return NextResponse.json({ message: 'Error updating active' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    await prisma.active.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({message: 'Delete success'}, { status: 200 });
  } catch (error) {
    console.error('Error deleting active', error);
    return NextResponse.json({ message: 'Error deleting active' }, { status: 500 });
  }
}
