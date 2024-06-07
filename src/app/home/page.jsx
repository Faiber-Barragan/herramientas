import React from 'react';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="w-full bg-blue-500 text-white py-6 shadow-md">
        <h1 className="text-4xl text-center font-bold">Welcome to Alquiler de Equipos Y Herramientas</h1>
      </header>

      <main className="flex flex-col items-center justify-center mt-10 p-5 bg-white rounded-lg shadow-lg w-4/5 md:w-2/3 lg:w-1/2">
        <h2 className="text-2xl font-semibold text-blue-500 mb-4">Hello, User!</h2>
        <p className="text-gray-700 text-center mb-6">
          Welcome to Alquiler de Equipos Y Herramientas. We're excited to have you here. Explore our features and enjoy your stay.
        </p>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-400 transition duration-200">
          Get Started
        </button>
      </main>

      <section className="mt-10 p-5 w-full flex flex-col items-center">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-4/5 md:w-2/3 lg:w-1/2">
          <h3 className="text-xl font-semibold text-blue-500 mb-3">Feature 1</h3>
          <p className="text-gray-700">Description of Feature 1.</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-4/5 md:w-2/3 lg:w-1/2">
          <h3 className="text-xl font-semibold text-blue-500 mb-3">Feature 2</h3>
          <p className="text-gray-700">Description of Feature 2.</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-4/5 md:w-2/3 lg:w-1/2">
          <h3 className="text-xl font-semibold text-blue-500 mb-3">Feature 3</h3>
          <p className="text-gray-700">Description of Feature 3.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
