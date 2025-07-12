import React from 'react'
import './Footer.css'
import user from '../../assets/user_icon.svg'

export default function Footer() {

  return (
    <div className='footer'>
    <div className="footer-top">
        <div className="footer-top-left">
            <h1>Ahmad</h1>
            <p>I am frontend developer from,Pakistan with 1 year experience.</p>

        </div>
        <div className="footer-top-right">
            <div className="footer-email-input">
                <img src={user} alt="" />
                <input type="email" placeholder='Enter your email' />
            </div>
            <div className="footer-subcribe">Subscribe</div>
        </div>
    </div>
    <hr/>
    <div className="footer-bottom">
        <p className='footer-bottom-left'>©2024 Muhammad Ahmad.All rights reserved.</p>
        <div className="footer-bottom-right">
            <p>Term of Services</p>
            <p>Term of Policy</p>
            <p>Connect with me</p>
        </div>
    </div>
</div>
   
  )
}
