import React from 'react'
import './Service.css'
import service_data from '../../assets/services_data'
import service from '../../assets/arrow_icon.svg'
import Navber from '../Navber/Navber'
import Footer from '../Footer/Footer'

export default function Services() {
  return (
    <>
    <Navber/>
    <div id='service' className='service'>
        <div className='service-title'>
            <h1>My Services</h1>
            <hr ></hr>
        </div>
        <div className='service-container'>
            {service_data.map((value,i)=>{
                return(
                    <div  key={i} className='service-format'>
                        <h3>{value.s_no}</h3>
                        <h2>{value.s_name}</h2>
                        <p>{value.s_desc}</p>
                        <div className='service-readmore'>
                            <p>Read More</p>
                            <img src={service} alt="" />
                        </div>

                    </div>
                )
                
            })}
             
        </div>
    </div>
    <Footer/>
    </>
   
  )
}
