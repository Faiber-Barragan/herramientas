import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
  
      if (id) {
        const reservation = await prisma.reservation.findUnique({
          where: { id: parseInt(id) },
        });
        return NextResponse.json(reservation, { status: 200 });
      } else {
        const reservations = await prisma.reservation.findMany();
        return NextResponse.json(reservations, { status: 200 });
      }
    } catch (error) {
      console.error('Error fetching reservation', error);
      return NextResponse.json({ message: 'Error fetching reservation' }, { status: 500 });
    }
}
  
export async function POST(req) {
    try {
        const data = await req.json();
        const newReservation = await prisma.reservation.create({
            data: {
                ...data,
            },
        });
        return NextResponse.json(newReservation, { status: 201 });
    } catch (error) {
        console.error('Error creating reservation', error);
        return NextResponse.json({ message: 'Error creating reservation' }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const data = await req.json();

        const updatedReservation = await prisma.reservation.update({
        where: { id: parseInt(id) },
            data: {
                ...data,
            },
        });
        return NextResponse.json(updatedReservation, { status: 200 });
    } catch (error) {
        console.error('Error updating reservation', error);
        return NextResponse.json({ message: 'Error updating reservation' }, { status: 500 });
    }
}
  
export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        await prisma.reservation.delete({
            where: { id: parseInt(id) },
        });
        return NextResponse.json({}, { status: 204 });
    } catch (error) {
        console.error('Error deleting reservation', error);
        return NextResponse.json({ message: 'Error deleting reservation' }, { status: 500 });
    }
}
  