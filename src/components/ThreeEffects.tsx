import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { AppStage } from '../contexts/AppContext'

/* ── Soft light sparkle particles ── */
function Sparkles({ count = 80 }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14
      arr[i * 3 + 2] = -1 + Math.random() * 2
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.012
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#88ccff"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </points>
  )
}

/* ── Soft blue expanding ring (greeting phase) ── */
function GlowRing({ active }: { active: boolean }) {
  const ref = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshBasicMaterial>(null)
  const t = useRef(0)

  useFrame((_, delta) => {
    if (!ref.current || !matRef.current || !active) return
    t.current += delta * 0.5
    const s = (t.current % 3) / 3
    ref.current.scale.setScalar(0.5 + s * 2.5)
    matRef.current.opacity = Math.max(0, 0.6 - s * 0.6)
  })

  return (
    <mesh ref={ref} position={[0, -1, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.2, 0.008, 8, 80]} />
      <meshBasicMaterial ref={matRef} color="#55aaff" transparent opacity={0.6} />
    </mesh>
  )
}

/* ── Floating soft orbs (menu phase only) ── */
function FloatOrbs() {
  const group = useRef<THREE.Group>(null)
  const data = useMemo(() => Array.from({ length: 6 }, () => ({
    x: (Math.random() - 0.5) * 7,
    y: (Math.random() - 0.5) * 9,
    z: -0.5 + Math.random(),
    r: 0.05 + Math.random() * 0.07,
    speed: 0.3 + Math.random() * 0.4,
    phase: Math.random() * Math.PI * 2,
  })), [])

  useFrame(({ clock }) => {
    group.current?.children.forEach((m, i) => {
      const d = data[i]
      m.position.y = d.y + Math.sin(clock.getElapsedTime() * d.speed + d.phase) * 0.25
    })
  })

  return (
    <group ref={group}>
      {data.map((d, i) => (
        <mesh key={i} position={[d.x, d.y, d.z]}>
          <sphereGeometry args={[d.r, 8, 8]} />
          <meshBasicMaterial color="#99ddff" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

function Scene({ stage }: { stage: AppStage }) {
  const isGreeting = stage === 'greeting'
  const isMenu     = ['menu','service','hospital','pricing','contact'].includes(stage)
  return (
    <>
      <Sparkles count={isMenu ? 100 : 60} />
      {isGreeting && <GlowRing active />}
      {isMenu && <FloatOrbs />}
    </>
  )
}

export default function ThreeEffects({ stage }: { stage: AppStage }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Scene stage={stage} />
    </Canvas>
  )
}
