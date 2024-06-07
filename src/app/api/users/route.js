import { NextResponse } from 'next/server'
import { findUserByEmail, createUser } from '@/services/user'
import Joi from 'joi';

export async function POST(req) {
    try {
        let requestUser = await req.json();
        const { error, value: validatedUser } = validateUser(requestUser);
        console.log('faiber', validatedUser, 'hola', requestUser)
        if (error) {
            console.error(error, 'bad request creating user')
            return NextResponse.json({ message: 'Bad request' }, { status: 400 });
        }

        const user = await findUserByEmail(validatedUser.email);

        if ( user !== null ) {
            return NextResponse.json({ message: 'User already exist' }, { status: 400 });
        }

        const response = await createUser(validatedUser)

        return NextResponse.json({ ...response }, { status: 200 })

    } catch (error) {
        console.error('Error logging user', error)
    }
}

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phoneNumber: Joi.number().integer().min(1000).max(9999999999).required(),
    address: Joi.string().required(),
  });
  
function validateUser(user) {
    return userSchema.validate(user);
}
