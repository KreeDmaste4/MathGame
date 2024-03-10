import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/home.css'
import math from '../images/math.png'

const Home = () => {
  return (
    <>
    <div className="container">
      <Link className='link' to={'/math'}><img className='link_img' src={math} alt="" /></Link>
    </div>
    </>
  )
}

export default Home