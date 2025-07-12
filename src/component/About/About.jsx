import React from 'react'
import './About.css'
import pic from"../../assets/hero2.png"
import Navber from '../Navber/Navber'
import Footer from '../Footer/Footer'

export default function About() {
  return (
    <>
    <Navber/>
    <div id='Abouts' className='About'>
     <div className="about-text">
        <h1>About</h1><hr></hr>
     </div>
    
    <div className='container'>
    <div className='row align-items-center g-4'> {/* Added vertical alignment and grid gap */}
        {/* Image Column */}
        <div className='col-12 col-lg-6 col-md-6 col-sm-12'> {/* Fixed column sizes */}
            <img 
                src={pic} 
                alt="About me" 
                className='img-fluid '
                style={{maxHeight: "500px", objectFit: "cover"}} 
            />
        </div>

        {/* Content Column */}
        <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
            <div className='about-left mb-4'> {/* Added margin bottom */}
                {/* Add your about-left content here */}
            </div>

            <div className='para mb-4'> {/* Added margin bottom */}
                <p className='lead'> {/* Added lead class for better typography */}
                    I am a passionate Front-end developer with a focus on building
                    modern and responsive web applications. With a strong foundation
                    in frontend technologies, I strive to create
                    seamless and efficient user experiences.
                </p>
            </div>

            <div className='skills'>
                {/* Skill Items with Bootstrap progress bars */}
                <div className='skill-item mb-3'>
                    <div className='d-flex justify-content-between'>
                        <p className='mb-1'>HTML & CSS</p>
                        <span>100%</span>
                    </div>
                    <div className="progress" style={{height: "4px"}}>
                        <div className="progress-bar" style={{width: "100%"}}></div>
                    </div>
                </div>

                <div className='skill-item mb-3'>
                    <div className='d-flex justify-content-between'>
                        <p className='mb-1'>Bootstrap</p>
                        <span>80%</span>
                    </div>
                    <div className="progress" style={{height: "4px"}}>
                        <div className="progress-bar" style={{width: "80%"}}></div>
                    </div>
                </div>

                <div className='skill-item mb-3'>
                    <div className='d-flex justify-content-between'>
                        <p className='mb-1'>Javascript</p>
                        <span>50%</span>
                    </div>
                    <div className="progress" style={{height: "4px"}}>
                        <div className="progress-bar" style={{width: "50%"}}></div>
                    </div>
                </div>

                <div className='skill-item mb-3'>
                    <div className='d-flex justify-content-between'>
                        <p className='mb-1'>React js</p>
                        <span>80%</span>
                    </div>
                    <div className="progress" style={{height: "4px"}}>
                        <div className="progress-bar" style={{width: "80%"}}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


        <div className='achievements'>
        
                <div className='achievement'>
                    <h1>1</h1>
                    <p>YEAR  EXPERIENCE</p>
                </div>
            
        
        
          
                <div className='achievement'>
                    <h1>80+</h1>
                    <p>Project Complate</p>
            
                </div>
                <hr />
            
          
                <div className='achievement'>
                    <h1>10+</h1>
                    <p>HAPPY CLIENT</p>
                </div>
                </div>
                </div>

   
       
        
      
<Footer/>
           
         
     </>   

  )
}
