"use client"

import React, {useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [isLoginOK, setIsLoginOK] = useState(null);
  
  const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    useEffect(() => {
      if (emailRef.current && passwordRef.current) {
        setEmail(emailRef.current.value);
        setPassword(passwordRef.current.value);
      }
    }, []);

    const handleSwitchToSignUp = () => {
      // Limpiar los datos del formulario de inicio de sesión
      setEmail('');
      setPassword('');
      // Cambiar al formulario de registro
      setShowLoginForm(false);
    };

    const handleFocus = (ref) => {
      if (ref.current) {
        ref.current.value = ref.current.value; // Trigger re-render to update state
      }
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault(); // Evitar que el formulario se envíe automáticamente
  
      // Construir el objeto de datos a enviar
      const formData = {
        email: email,
        password: password
      };
  
      try {
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) {
          throw new Error('Error al enviar los datos');
        }

        setIsLoginOK(true);
  
        // Manejar la respuesta, si es necesario
        router.push('/home');
      } catch (error) {
        setIsLoginOK(false);
        console.error('Error:', error);
      }
    };
  
    return (
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-out">
        <h2 className='p-3 text-3xl font-bold text-pink-400'>Alquiler de Equipos Y Herramientas</h2>
        <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
        { isLoginOK === true && <h3 className='text-xl font-semibold text-blue-400 pt-2'>Sign In!</h3> }
        { isLoginOK === false && <h3 className='text-xl font-semibold text-red-400 pt-2'>Email o contraseña invalidas</h3> } 
  
        <form onSubmit={handleSubmit}>
          {/* Inputs */}
          <div className='flex flex-col items-center justify-center'>
            <input 
              type='email' 
              value={email} 
              onFocus={() => handleFocus(emailRef)}
              onChange={(e) => setEmail(e.target.value)} 
              className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' 
              placeholder='Email' 
              ref={emailRef}
            />
            <input 
              type="password" 
              value={password} 
              onFocus={() => handleFocus(passwordRef)}
              onChange={(e) => setPassword(e.target.value)} 
              className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' 
              placeholder='Password'
              ref={passwordRef}
            />
            <button type="submit" className='rounded-2xl m-2 text-white bg-blue-400 w-2/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'>
              Sign In
            </button>
          </div>
        </form>
  
        <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
        <p className='text-blue-400 mt-4 text-sm'>Don't have an account?</p>
        <p className='text-blue-400 mb-4 text-sm font-medium cursor-pointer' onClick={() => handleSwitchToSignUp(false)}>Create a New Account?</p>
      </div>
    );
  };
  
  const  SignUpForm = () => {
    const [emailSign, setEmailSign] = useState('');
    const [passwordSign, setPasswordSign] = useState('');
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSwitchToLogin = () => {
      // Limpiar los datos del formulario de registro
      setName('');
      setEmailSign('');
      setPasswordSign('');
      setPhoneNumber('');
      setAddress('');
      // Cambiar al formulario de inicio de sesión
      setShowLoginForm(true);
    };

    const handleSubmit = async (event) => {
      event.preventDefault(); // Evitar que el formulario se envíe automáticamente
  
      // Construir el objeto de datos a enviar
      const formData = {
        email: emailSign,
        password: passwordSign,
        name: name,
        address: address,
        phoneNumber: phoneNumber,
      };
  
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) {
          throw new Error('Error al enviar los datos');
        }

        setShowLoginForm(true)
  
      } catch (error) {
        console.error('Error:', error);
      }
    };

    return (
      <div className="bg-blue-400 text-white rounded-2xl shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-in">
        <h2 className='p-3 text-3xl font-bold text-white'>Alquiler de Equipos Y Herramientas</h2>
        <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
        <h3 className='text-xl font-semibold text-white pt-2'>Create Account!</h3>
        {/* Inputs */}
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col items-center justify-center mt-2'>
            <input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0 text-black' 
              placeholder='Name'
              autoComplete="new-name"
              required
            />
            <input 
              type='email' 
              value={emailSign} 
              onChange={(e) => setEmailSign(e.target.value)} 
              className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0 text-black' 
              placeholder='Email'
              autoComplete="new-email"
              required
            />
            <input 
              type="password" 
              value={passwordSign} 
              onChange={(e) => setPasswordSign(e.target.value)} 
              className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0 text-black' 
              placeholder='Password'
              autoComplete="new-password" 
              required
            />
            <input 
              type="number"
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
              className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0 text-black' 
              placeholder='Phone'
              autoComplete="new-phone"
              required
            />
            <input 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0 text-black' 
              placeholder='Address'
              autoComplete="new-address"
              required
            />
            <button 
              className='rounded-2xl m-4 text-blue-400 bg-white w-3/5 px-4 py-2 shadow-md hover:text-white hover:bg-blue-400 transition duration-200 ease-in'>
              Sign Up
            </button>
          </div>
        </form>
        <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
        <p className='text-white mt-4 text-sm'>Already have an account?</p>
        <p className='text-white mb-4 text-sm font-medium cursor-pointer' onClick={() => handleSwitchToLogin(true)}>Sign In to your Account?</p>
      </div>
    );
  }    

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen md:py-2">
    <main className="flex items-center w-full px-2 md:px-20">
      <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
        <p className='text-6xl text-blue-500 font-bold'>Alquiler de Equipos Y Herramientas</p>
        <p className='font-medium text-lg leading-1 text-pink-400'>Explore your interests, meet new friends & expand your horions</p>
      </div>
      {
        showLoginForm ? <LoginForm/> : <SignUpForm/>
      }
    </main>
    </div>
  )
}

export default Login