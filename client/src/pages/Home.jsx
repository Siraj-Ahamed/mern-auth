import React from 'react'

export default function Home() {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>Welcome to my Auth App</h1>
      <p className='mb-4 text-slate-700'>This is full-stack web application built with the MERN (MongoDB, Express, React, Node.js) stack. It includes authentication features that allow users to sign up, log in anf log out and provides access to protected routes only for authenticated users.</p>
      <p className='mb-4 text-slate-700'>The front-end of the application is built with React and uses React Router for client-side routing. The back-end is built with Noode.js and Express, and uses MongoDB as the database. Authentication is implemented using JSON Web Tokens (JWT). </p>
      <p className='mb-4 text-slate-700'>The application is intended as a starting point for building full-stack web applications with authenticating using the MERN stack. Feel free to use it as a template for your own projects.</p>
    </div>
  )
}
