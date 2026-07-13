import React, { useState } from 'react';
import Navbar from '../Navber/Navber';
import Footer from '../Footer/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    // Fields Validation
    if (!name || !email || !message) {
      toast.warning("Please fill in all the fields!", {
        position: "top-right",
      });
      return;
    }

    try {
      // Web3Forms API Submission Data setup
      const submissionData = new FormData();
      submissionData.append("name", name);
      submissionData.append("email", email);
      submissionData.append("message", message); // Map kiya aapke message se
      submissionData.append("access_key", "fff54e3c-49ac-48a4-956b-b7e75fe397f0");

      const object = Object.fromEntries(submissionData);
      const json = JSON.stringify(object);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());

      if (res.success) {
        toast.success("Message sent successfully!", {
          position: "top-right",
        });
        setFormData({ name: '', email: '', message: '' }); // Form reset state
      } else {
        toast.error("Something went wrong! Please try again.");
      }
    } catch (error) {
      toast.error("Network error or invalid response!");
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col justify-between">
      <Navbar />

      <section id="contact" className="flex-grow flex items-center py-16 px-6 md:px-12 max-w-5xl mx-auto w-full selection:bg-cyan-500/30 relative z-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Block copywriting content */}
          <div className="md:col-span-5 space-y-6 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight inline-block relative after:absolute after:-bottom-2 after:left-1/2 md:after:left-0 after:transform after:-translate-x-1/2 md:after:translate-x-0 after:w-12 after:h-1 after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500">
              Let's Connect
            </h2>
            <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed pt-2">
              Got an adaptive web workspace blueprints layout, an enterprise web application architecture, or a modern user experience interface to build? Drop a direct note here.
            </p>
            <div className="space-y-4 text-sm font-medium text-slate-300 pt-2 inline-block md:block text-left">
              <p className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
                <span className="text-base text-cyan-400">📧</span> ahmaddev545@gmail.com
              </p>
              <p className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
                <span className="text-base text-cyan-400">📍</span> Lahore, Pakistan
              </p>
            </div>
          </div>

          {/* Right side interactive card layout form */}
          <div className="md:col-span-7 bg-slate-900/60 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-slate-900 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-slate-400 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950/80 border border-slate-800/80 focus:border-cyan-500 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-700 text-sm focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-slate-400 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950/80 border border-slate-800/80 focus:border-cyan-500 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-700 text-sm focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-slate-400 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full bg-slate-950/80 border border-slate-800/80 focus:border-cyan-500 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-700 text-sm focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold tracking-wider uppercase text-xs text-slate-950 rounded-xl shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30 transform hover:-translate-y-0.5 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </section>

      <Footer />
      {/* Toast Notifications Container Container */}
      <ToastContainer />
    </div>
  );
}

export default Contact;