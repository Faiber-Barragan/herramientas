import { NextResponse } from 'next/server'
import { findUserByEmail } from '@/services/user'

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        const user = await findUserByEmail(email);

        if ( user === null ) {
            return NextResponse.json({ message: 'Email or password invalid' }, { status: 400 });
        }

        if (password !== user.password) {
            return NextResponse.json({ message: 'Email or password invalid' }, { status: 403 });
        }

        return NextResponse.json({}, { status: 200 })

    } catch (error) {
        console.error('Error logging user', error)
    }
}

