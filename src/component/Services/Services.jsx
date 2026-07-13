import React from 'react';
import arrowIcon from '../../assets/arrow_icon.svg';
import Navbar from '../Navber/Navber';
import Footer from '../Footer/Footer';

export default function Services() {
  // Aapki requirements ke mutabiq customized modern texting aur services data
  const customServices = [
    {
      s_no: "01",
      s_name: "Full Stack Web Development",
      s_desc: "Building scalable, secure, and hyper-responsive web applications using the MERN stack. From pixel-perfect React interfaces to robust Node.js backend systems and optimized MongoDB databases."
    },
    {
      s_no: "02",
      s_name: "AI Model Integration",
      s_desc: "Connecting advanced Al capabilities into standard web applications. Experienced in training, configuring, and deploying complex deep learning datasets and computer vision models (like VITON-HD) into dynamic full-stack environments."
    },
    {
      s_no: "03",
      s_name: "Digital Marketing & SEO",
      s_desc: "Optimizing web platforms for maximum search engine visibility and high traffic conversion. Implementing technical SEO, programmatic optimization, metadata engineering, and performance audits to amplify your digital footprint."
    }
  ];

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow py-16 px-6 md:px-12 max-w-6xl mx-auto w-full selection:bg-cyan-500/30">
        {/* Title Container */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight inline-block relative after:absolute after:-bottom-3 after:left-1/2 after:transform after:-translate-x-1/2 after:w-16 after:h-1 after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500">
            My Services
          </h1>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customServices.map((value, i) => (
            <div 
              key={i} 
              className="bg-slate-900/60 border border-slate-900 hover:border-slate-800 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between min-h-[300px]"
            >
              <div className="space-y-4">
                <span className="text-sm font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  {value.s_no}
                </span>
                <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {value.s_name}
                </h2>
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                  {value.s_desc}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800/40 mt-6 flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300 group-hover:text-white transition-colors">
                  Read More
                </span>
                <img 
                  src={arrowIcon} 
                  alt="Arrow icon interaction trigger" 
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform filter invert brightness-200" 
                />
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}