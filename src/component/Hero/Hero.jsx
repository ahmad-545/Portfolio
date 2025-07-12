import React from 'react'
import './Hero.css'
import pic from '../../assets/hero2.png'

import AnchorLink from 'react-anchor-link-smooth-scroll'
import Navber from '../Navber/Navber'
import Work from '../Work/Work'
import Footer from '../Footer/Footer'

export default function Hero() {
  return (
    <>
    <Navber/>
    
    

<section>
        <div id='hero'  className='hero'>
            
                    <img  src={pic} alt="" />
                    
                <h1><span>I'm Muhammad Ahmad</span>,frontend developer based in Pakistan </h1>
                <p>I am a frontend developer from lahore,one year experience. </p>
                  
                <div className='hero-action justify-content-center'>
                <AnchorLink className='anchor-link' offset={50} href='#Contact'> <div className='hero-contact'>Contact  Me</div></AnchorLink>
                    <div className='hero-resume'>My resume</div>
                    </div>
                </div>

                  
            
          

        
        </section>
        <Footer/>
       
    
    </>
  )
}
