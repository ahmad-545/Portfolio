 import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, Links } from 'react-router-dom';
import './Navber.css'
 
 function Navber() {

  let [msatatus, setMsatatus] = useState(false);
    const [sticky, setSticky] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);






   return (
     <>

     <header className={sticky ? "sticky" : ""}>
            <a href="/" className='logo'>Coder</a>
            
            <ul className={`navbar ${msatatus ? 'activeMenu':""}`}>
                <li><Link to={'/'}><a href='#'>Home</a></Link></li>
                <li><Link to={'/About'}><a href='#'>About Us</a></Link></li>
               
               
                <li><Link to={"/work"}><a href='#'>Work</a></Link></li>
                <li><Link to={"/Services"}><a href='#'>Services</a></Link></li>
                <li><Link to={"/contact"}><a href='#'>Contact</a></Link></li>
                                 

                


               
               
            </ul>
            
                    
               










                <div className='menu' onClick={()=>setMsatatus(!msatatus)}>
                {msatatus?
                <span>&#10005;</span>
                :
                <span>&#9776;</span>
                }
                </div>
                                
        
            
        </header>
    


     </>
   )
 }
 
 export default Navber;