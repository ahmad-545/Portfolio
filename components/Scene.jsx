'use client'
import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'

class SceneErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(err) {
    console.warn('Scene 3D caught safely:', err)
  }
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

function Blob() {
  const g = useRef()
  useFrame((s, d) => {
    const sc = typeof window !== 'undefined' ? Math.min(window.scrollY / 900, 1) : 0
    if (!g.current) return
    g.current.rotation.y += d * 0.25
    g.current.rotation.x += (s.pointer.y * 0.6 - g.current.rotation.x) * 0.05
    g.current.position.x += (s.pointer.x * 0.6 - g.current.position.x) * 0.05
    g.current.scale.setScalar(1 + sc * 0.6)
  })
  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.4}>
      <group ref={g}>
        <mesh>
          <torusKnotGeometry args={[1, 0.34, 220, 32]} />
          <MeshDistortMaterial color="#F5A300" roughness={0.25} metalness={0.85} distort={0.35} speed={2} emissive="#7a2b00" emissiveIntensity={0.35} />
        </mesh>
      </group>
    </Float>
  )
}

function Particles({ count = 300 }) {
  const ref = useRef()
  const pos = useMemo(() => Float32Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 14), [count])
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.03
  })
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3} /></bufferGeometry>
      <pointsMaterial size={0.025} color="#F5A300" transparent opacity={0.7} />
    </points>
  )
}

function Ico() {
  const m = useRef()
  useFrame((st, d) => {
    if (!m.current) return
    m.current.rotation.y += d * 0.2
    m.current.rotation.x += (st.pointer.y * 0.8 - m.current.rotation.x) * 0.04
  })
  return (
    <mesh ref={m}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshBasicMaterial wireframe color="#F5A300" transparent opacity={0.55} />
    </mesh>
  )
}

export default function Scene({ variant = 'blob' }) {
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    try {
      const isTouch = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)
      const isLargeScreen = window.innerWidth >= 1024
      const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      const canvas = document.createElement('canvas')
      const hasWebGL = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))

      if (isLargeScreen && !isTouch && hasFinePointer && hasWebGL) {
        setCanRender(true)
      }
    } catch (_) {
      setCanRender(false)
    }
  }, [])

  if (!canRender) return null

  return (
    <SceneErrorBoundary>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true, powerPreference: 'default' }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 3]} intensity={2.2} color="#ffd79a" />
        <pointLight position={[-4, -2, 2]} intensity={30} color="#ff5a00" />
        {variant === 'ico' ? <Ico /> : <Blob />}<Particles />
      </Canvas>
    </SceneErrorBoundary>
  )
}
