import React from 'react'
import './Contact.css'
import mail from '../../assets/mail_icon.svg'
import location from '../../assets/location_icon.svg'
import call from '../../assets/call_icon.svg'
import Navber from '../Navber/Navber'
import Footer from '../Footer/Footer'

export default function Contact() {


  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "fff54e3c-49ac-48a4-956b-b7e75fe397f0");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());
 
    if (res.success) {
      alert(res.message)
    }
  };







  return (
    <>
    <Navber/>
    <div id='Contact' className='Contact'>
    <div className='container '>
    <h1 className='contact-text'>Contact<hr style={{width:'30%'}}></hr></h1>
  <div className='row gap-3 py-3'>
        <div className='col-md-5'>
        <h1>Let's talk</h1>
        <p>I'm currently avaliable to take on new project, so feel free to send me a message about anything that you want to work on.You can contact anytime.</p>
        <div className="contact-details">
            <div className="contact-detail">
                <img src={mail} alt="" /><p>ahmaddev545@gmail.com</p>
                
            </div>
            <div className="contact-detail">
            <img src={call} alt="" /><p>03484236919</p>

            </div>
            <div className="contact-detail">
            <img src={location} alt="" /><p>Lahore,Pakistan</p>
            </div>
    

        </div>
    </div>
    <div className="  col-md-6 ">
    <form onSubmit={onSubmit}  className="contact-right">
    <div className='text-start pb-3'>

          <label className='form-label'>Your Name</label>
          <input className='form-control' type='text' name= 'name'/>
        </div>
    <div className='text-start pb-3'>
          <label className='form-label'>Your Email</label>
          <input className=' form-control' type='email' name= 'email'/>
        </div>
        <div className='mb-3'>
        <label for="" class='form-label'>Write your message</label>
       <textarea className= 'form-control'name='umassage'   rows="5"/>
      </div>
      <button type='submit' className='contact-submit'>Submit now</button>
    
        
    </form>

    </div>


 
 
    
  </div>
</div>
</div>


<Footer/>
   
  </> 
  )

}
