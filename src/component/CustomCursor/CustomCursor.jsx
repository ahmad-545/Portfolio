import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Original system mouse pointer ko hide karne ke liye
    document.body.style.cursor = 'none';

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot ko direct instant position dena (Zero lag)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Smooth following ring animation loop
    let animationFrameId;
    const render = () => {
      ringX += (mouseX - ringX) * 0.2; // 0.2 smoothing factor
      ringY += (mouseY - ringY) * 0.2;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Hover detection for interactive elements
    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.style.cursor = 'auto'; // Cleanup par original cursor wapas laana
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden hidden md:block">
      {/* Small Sharp Dot (Exact Mouse Position) */}
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 w-3 h-3 bg-cyan-400 rounded-full -ml-1.5 -mt-1.5 transition-transform duration-75 ${
          isClicking ? 'scale-50' : 'scale-100'
        }`}
      />

      {/* Smooth Following Ring with Hover Expansion */}
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 rounded-full border border-cyan-400/80 -ml-5 -mt-5 transition-all duration-100 ${
          isHovered
            ? 'w-14 h-14 -ml-7 -mt-7 bg-cyan-500/20 border-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.5)]'
            : 'w-10 h-10'
        } ${isClicking ? 'scale-75' : 'scale-100'}`}
      />
    </div>
  );
}