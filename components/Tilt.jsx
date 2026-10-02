'use client'
export default function Tilt({ children, className = '' }) {
  const move = (e) => {
    const el = e.currentTarget, r = el.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top
    el.style.transform = `perspective(900px) rotateY(${(x / r.width - 0.5) * 10}deg) rotateX(${-(y / r.height - 0.5) * 10}deg)`
    el.style.setProperty('--mx', x + 'px'); el.style.setProperty('--my', y + 'px')
  }
  return <div onMouseMove={move} onMouseLeave={(e) => { e.currentTarget.style.transform = '' }} style={{ transition: 'transform .2s' }}
    className={`relative overflow-hidden before:absolute before:inset-0 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:pointer-events-none before:bg-[radial-gradient(300px_circle_at_var(--mx)_var(--my),rgba(245,163,0,.18),transparent_70%)] ${className}`}>{children}</div>
}
