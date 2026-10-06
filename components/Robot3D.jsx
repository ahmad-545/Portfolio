'use client'
import React, { useRef, useMemo, Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, useTexture } from '@react-three/drei'
import * as THREE from 'three'

// ErrorBoundary to prevent any Three.js / WebGL crash from affecting the page
class ThreeErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error, info) {
    console.warn('WebGL/3D caught safely:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || null
    }
    return this.props.children
  }
}

// 3D Robot Hologram Platform Rings
function HologramBase() {
  const ring1 = useRef()
  const ring2 = useRef()
  const ring3 = useRef()

  useFrame((_, delta) => {
    if (ring1.current) ring1.current.rotation.z += delta * 0.4
    if (ring2.current) ring2.current.rotation.z -= delta * 0.3
    if (ring3.current) ring3.current.rotation.z += delta * 0.2
  })

  return (
    <group position={[0, -1.55, 0]} rotation={[-Math.PI / 2.3, 0, 0]}>
      {/* Outer Golden Ring */}
      <mesh ref={ring1}>
        <torusGeometry args={[1.5, 0.015, 16, 80]} />
        <meshBasicMaterial color="#F5A300" transparent opacity={0.7} />
      </mesh>
      {/* Middle Cyan Ring */}
      <mesh ref={ring2}>
        <torusGeometry args={[1.2, 0.012, 16, 60]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.65} />
      </mesh>
      {/* Inner Accent Ring */}
      <mesh ref={ring3}>
        <torusGeometry args={[0.9, 0.01, 16, 48]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

// 3D Cybernetic Data Particles
function CyberParticles({ count = 60 }) {
  const ref = useRef()
  const pos = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 5.5
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4.5
      arr[i * 3 + 2] = (Math.random() - 0.5) * 3
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.06
      ref.current.rotation.x += delta * 0.02
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#06B6D4" transparent opacity={0.65} />
    </points>
  )
}

// 3D Interactive Robot Mesh
function RobotMesh() {
  const groupRef = useRef()
  const meshRef = useRef()
  const lightRef = useRef()

  // Load transparent texture, normal map and depth map
  const [texture, normalMap, depthMap] = useTexture([
    '/images/robot-transparent.png',
    '/images/robot-normal.png',
    '/images/robot-depth.png',
  ])

  // Configure texture filtering for crisp 3D details
  useMemo(() => {
    if (texture) {
      texture.generateMipmaps = true
      texture.minFilter = THREE.LinearMipmapLinearFilter
      texture.magFilter = THREE.LinearFilter
    }
  }, [texture])

  useFrame((state) => {
    if (!groupRef.current) return

    // Smooth cursor tracking in 3D space
    const targetRotY = state.pointer.x * 0.48
    const targetRotX = -state.pointer.y * 0.32
    const targetPosX = state.pointer.x * 0.22
    const targetPosY = state.pointer.y * 0.18

    // Smooth damping
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.08
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.08
    groupRef.current.position.x += (targetPosX - groupRef.current.position.x) * 0.08
    groupRef.current.position.y += (targetPosY - groupRef.current.position.y) * 0.08

    // Real-time cursor light follows mouse
    if (lightRef.current) {
      lightRef.current.position.x = state.pointer.x * 3.5
      lightRef.current.position.y = state.pointer.y * 3.5
      lightRef.current.position.z = 2.2
    }
  })

  return (
    <>
      {/* Dynamic Cursor Light */}
      <pointLight ref={lightRef} color="#E0F2FE" intensity={18} distance={8} />

      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={groupRef}>
          {/* Main 3D Robot Plane with Normal & Displacement */}
          <mesh ref={meshRef} position={[0, 0.1, 0]}>
            <planeGeometry args={[3.5, 3.5, 128, 128]} />
            <meshStandardMaterial
              map={texture}
              normalMap={normalMap}
              normalScale={new THREE.Vector2(0.55, 0.55)}
              displacementMap={depthMap}
              displacementScale={0.16}
              displacementBias={-0.05}
              roughness={0.28}
              metalness={0.72}
              transparent={true}
              alphaTest={0.03}
              depthWrite={true}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </Float>
    </>
  )
}

function FallbackRobot() {
  return (
    <div className="w-full h-full flex items-center justify-center select-none">
      <img
        src="/images/robot-transparent.png"
        alt="Muhammad Ahmad AI Robot Assistant"
        className="w-[85%] max-w-[360px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(6,182,212,0.35)]"
        loading="eager"
      />
    </div>
  )
}

export default function Robot3D({ className = '' }) {
  // Always starts as false: SSR and mobile get the clean FallbackRobot without touching WebGL
  const [canRender3D, setCanRender3D] = useState(false)

  useEffect(() => {
    try {
      const isTouch = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)
      const isLargeScreen = window.innerWidth >= 1024
      const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      const canvas = document.createElement('canvas')
      const hasWebGL = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))

      if (isLargeScreen && !isTouch && hasFinePointer && hasWebGL) {
        setCanRender3D(true)
      }
    } catch (_) {
      setCanRender3D(false)
    }
  }, [])

  // Mobile / touch / small screens: render clean, lightweight image (no WebGL overhead or crash)
  if (!canRender3D) {
    return <FallbackRobot />
  }

  return (
    <div className={`relative w-full h-[320px] sm:h-[380px] md:h-[440px] lg:h-[540px] flex items-center justify-center select-none ${className}`}>
      <ThreeErrorBoundary fallback={<FallbackRobot />}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 4.3], fov: 44 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'default' }}
          className="cursor-grab active:cursor-grabbing"
        >
          <ambientLight intensity={0.8} />
          {/* Key Golden Warm Light */}
          <directionalLight position={[3.5, 4, 3]} intensity={2.6} color="#ffd79a" />
          {/* High-tech Cyan Rim Light from behind-left */}
          <pointLight position={[-3.5, 1.8, -1.5]} intensity={25} color="#00f0ff" />
          {/* Soft bottom fill */}
          <pointLight position={[0, -2.5, 2]} intensity={12} color="#F5A300" />

          <Suspense fallback={null}>
            <RobotMesh />
            <HologramBase />
            <CyberParticles count={60} />
          </Suspense>
        </Canvas>
      </ThreeErrorBoundary>
    </div>
  )
}
