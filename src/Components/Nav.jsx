import React from 'react'
import Navbar from './Navbar'
import CustomeAuthContext from '../context/authContext'
import CustomeProductContext from '../context/productContext'

const Nav = () => {
  return (
    <CustomeAuthContext>
      <CustomeProductContext>
        <Navbar />
      </CustomeProductContext>
    </CustomeAuthContext>
  )
}

export default Nav;