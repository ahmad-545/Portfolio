import React from 'react';
import mywork_data from '../../assets/mywork_data';
import showmore from '../../assets/arrow_icon.svg';
import Navbar from '../Navber/Navber';
import Footer from '../Footer/Footer';

export default function Work() {
  return (
    <div className="bg-slate-950 min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow py-16 px-6 md:px-12 max-w-6xl mx-auto w-full selection:bg-cyan-500/30">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight inline-block relative after:absolute after:-bottom-3 after:left-1/2 after:transform after:-translate-x-1/2 after:w-16 after:h-1 after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500">
            My Latest Work
          </h1>
        </div>

        {/* Portfolio Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mywork_data.map((value, i) => (
            <div 
              key={i} 
              className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-900 aspect-video group shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-95 transition-opacity duration-300 z-10 flex flex-col justify-end p-6">
                <h3 className="text-lg font-bold text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  Project {i + 1}
                </h3>
                <p className="text-cyan-400 text-xs font-semibold tracking-wider uppercase mt-1">
                  Frontend Interface
                </p>
              </div>
              <img 
                src={value.w_img} 
                alt={`Showcase portfolio component module node ${i}`} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
              />
            </div>
          ))}
        </div>

        {/* Show More Trigger Component Button */}
        <div className="flex justify-center">
          <button className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white font-medium tracking-wide text-sm px-6 py-3 rounded-xl transition-all shadow-md group">
            <span>Show More</span>
            <img 
              src={showmore} 
              alt="Arrow interaction pointer" 
              className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform filter invert brightness-200"
            />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}