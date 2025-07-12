import React from 'react'
import  mywork_data from'../../assets/mywork_data'
import showmore from '../../assets/arrow_icon.svg'
import './Work.css'
import Navber from '../Navber/Navber'
import Footer from '../Footer/Footer'

export default function Work() {
  return (
    <>
    <Navber/>

     <div id='my-work' className='my-work'>
    <div className='my-work-title'>
      <h1>My Latest Work</h1>
      <hr></hr>
    </div>
    <div className='my-work-container'>
      {mywork_data.map((value,i)=>{
        return <img key={i} src={value.w_img} alt=''/>
      })}
    </div>
    <div className='my-work-showmore'>
      <p>Show More</p>
      <img src={showmore} alt="" />
    </div>

  </div>

  <Footer/>
    </>
  )
}
