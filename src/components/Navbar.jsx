import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex px-10 py-5 justify-between items-center bg-blue-700 text-white'>
        <div className="logo">
            <span className='font-bold text-2xl'>Do - Planer</span>
        </div>
        <ul className='flex gap-6'>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
    </nav>
  )
}

export default Navbar