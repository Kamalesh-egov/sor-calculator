import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className='text-center'>
      <h1 className='text-3xl mb-4'>Home</h1>
      <Link to="/sor-calculation" className='text-blue-500 underline'>Go to SOR calculation</Link>
    </div>
  )
}

export default Home