import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='flex flex-row justify-between p-4 bg-gray-800 text-white gap-4'>
           <NavLink 
           to='/'
           >
                Home
           </NavLink>

           <NavLink
           to='/pastes'>
                Pastes
            </NavLink>  
        </div>
    )
}

export default Navbar
