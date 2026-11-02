import { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Line, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { cases, topics, type PortfolioCase } from '../data/content'

type NodeData = {
  item: PortfolioCase
  position: [number, number, number]
  topicColor: string
}

type HubData = {
  id: string
  label: string
  color: string
  position: [number, number, number]
}

const HUB_POSITIONS: Record<string, [number, number, number]> = {
  branding: [-3.9, 1.45, 0],
  sistemas: [3.9, 1.45, 0],
  design: [-3.5, -1.65, 0.3],
  consultoria: [3.5, -1.65, 0.3],
}

const NODE_OFFSETS: [number, number, number][] = [
  [-1.25, 0.85, 0.75],
  [1.1, 0.7, -0.55],
  [0.15, -1.05, 0.65],
]

function buildGraph(): { hubs: HubData[]; nodes: NodeData[] } {
  const hubs: HubData[] = topics.map((t) => ({
    id: t.id,
    label: t.label,
    color: t.color,
    position: HUB_POSITIONS[t.id] ?? [0, 0, 0],
  }))

  const nodes: NodeData[] = []
  topics.forEach((t) => {
    const hubPos = HUB_POSITIONS[t.id] ?? [0, 0, 0]
    const topicCases = cases.filter((c) => c.topic === t.id)
    topicCases.forEach((c, idx) => {
      const off = NODE_OFFSETS[idx % NODE_OFFSETS.length]
      nodes.push({
        item: c,
        topicColor: t.color,
        position: [hubPos[0] + off[0], hubPos[1] + off[1], hubPos[2] + off[2]],
      })
    })
  })

  return { hubs, nodes }
}

function CaseCardNode({
  node,
  activeTopic,
  selectedId,
  onSelect,
}: {
  node: NodeData
  activeTopic: string
  selectedId: string | null
  onSelect: (c: PortfolioCase) => void
}) {
  const group = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const texture = useTexture(node.item.image)

  const isSelected = selectedId === node.item.id
  const isDimmed =
    (activeTopic !== 'all' && activeTopic !== node.item.topic) ||
    (selectedId !== null && !isSelected)

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    const floatY = Math.sin(t * 1.3 + node.position[0]) * 0.08
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, node.position[1] + floatY, 0.1)

    const targetScale = isSelected ? 1.28 : hovered ? 1.14 : isDimmed ? 0.82 : 1
    group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12)
  })

  return (
    <group
      ref={group}
      position={node.position}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(node.item)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = ''
      }}
    >
      {/* Moldura luminosa */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[1.92, 1.24]} />
        <meshBasicMaterial
          color={isSelected || hovered ? node.topicColor : '#1d4ed8'}
          transparent
          opacity={isDimmed ? 0.18 : isSelected || hovered ? 0.95 : 0.45}
        />
      </mesh>

      {/* Imagem do case */}
      <mesh>
        <planeGeometry args={[1.82, 1.14]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={isDimmed ? 0.25 : 1}
        />
      </mesh>

      {/* Etiqueta flutuante */}
      <Html position={[0, -0.78, 0]} center distanceFactor={9} zIndexRange={[10, 0]}>
        <button
          type="button"
          className={`constellation-tag ${isSelected ? 'is-selected' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
          onClick={() => onSelect(node.item)}
        >
          <span className="constellation-tag__dot" style={{ background: node.topicColor }} />
          <span>{node.item.title}</span>
        </button>
      </Html>
    </group>
  )
}

function Scene({
  activeTopic,
  selectedCase,
  onSelectCase,
  onSelectTopic,
}: {
  activeTopic: string
  selectedCase: PortfolioCase | null
  onSelectCase: (c: PortfolioCase | null) => void
  onSelectTopic: (topicId: string) => void
}) {
  const { camera, pointer } = useThree()
  const world = useRef<THREE.Group>(null)
  const { hubs, nodes } = useMemo(() => buildGraph(), [])

  const targetCam = useRef(new THREE.Vector3(0, 0, 9.2))
  const targetLook = useRef(new THREE.Vector3(0, 0, 0))
  const currentLook = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(() => {
    if (selectedCase) {
      const found = nodes.find((n) => n.item.id === selectedCase.id)
      if (found) {
        targetCam.current.set(found.position[0] * 0.85, found.position[1] * 0.85, found.position[2] + 3.15)
        targetLook.current.set(found.position[0], found.position[1], found.position[2])
      }
    } else if (activeTopic !== 'all') {
      const hub = HUB_POSITIONS[activeTopic]
      if (hub) {
        targetCam.current.set(hub[0] * 0.75, hub[1] * 0.75, 5.6)
        targetLook.current.set(hub[0] * 0.85, hub[1] * 0.85, 0)
      }
    } else {
      targetCam.current.set(pointer.x * 0.75, pointer.y * 0.45, 9.2)
      targetLook.current.set(0, 0, 0)
    }

    camera.position.lerp(targetCam.current, 0.065)
    currentLook.current.lerp(targetLook.current, 0.08)
    camera.lookAt(currentLook.current)

    if (world.current && !selectedCase) {
      world.current.rotation.y = THREE.MathUtils.lerp(world.current.rotation.y, pointer.x * 0.14, 0.05)
      world.current.rotation.x = THREE.MathUtils.lerp(world.current.rotation.x, -pointer.y * 0.08, 0.05)
    }
  })

  return (
    <group ref={world} onClick={() => onSelectCase(null)}>
      {/* Linhas conectando cada hub aos seus cases */}
      {hubs.map((hub) => {
        const hubNodes = nodes.filter((n) => n.item.topic === hub.id)
        const dimmed = activeTopic !== 'all' && activeTopic !== hub.id
        return (
          <group key={hub.id}>
            {hubNodes.map((n) => (
              <Line
                key={n.item.id}
                points={[hub.position, n.position]}
                color={hub.color}
                lineWidth={1}
                transparent
                opacity={dimmed ? 0.08 : 0.32}
              />
            ))}

            {/* Hub do assunto */}
            <mesh
              position={hub.position}
              onClick={(e) => {
                e.stopPropagation()
                onSelectTopic(activeTopic === hub.id ? 'all' : hub.id)
              }}
            >
              <sphereGeometry args={[0.14, 24, 24]} />
              <meshBasicMaterial color={hub.color} />
              <Html position={[0, 0.34, 0]} center distanceFactor={9} zIndexRange={[10, 0]}>
                <button
                  type="button"
                  className={`constellation-hub ${activeTopic === hub.id ? 'is-active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectTopic(activeTopic === hub.id ? 'all' : hub.id)
                  }}
                >
                  {hub.label}
                </button>
              </Html>
            </mesh>
          </group>
        )
      })}

      {/* Linhas sutis entre os 4 hubs centrais */}
      <Line
        points={[
          HUB_POSITIONS.branding,
          HUB_POSITIONS.sistemas,
          HUB_POSITIONS.consultoria,
          HUB_POSITIONS.design,
          HUB_POSITIONS.branding,
        ]}
        color="#1554cf"
        lineWidth={1}
        transparent
        opacity={0.16}
      />

      {/* Nós de cases */}
      <Suspense fallback={null}>
        {nodes.map((n) => (
          <CaseCardNode
            key={n.item.id}
            node={n}
            activeTopic={activeTopic}
            selectedId={selectedCase?.id ?? null}
            onSelect={(c) => onSelectCase(c)}
          />
        ))}
      </Suspense>
    </group>
  )
}

export default function ConstellationCanvas({
  activeTopic,
  selectedCase,
  onSelectCase,
  onSelectTopic,
}: {
  activeTopic: string
  selectedCase: PortfolioCase | null
  onSelectCase: (c: PortfolioCase | null) => void
  onSelectTopic: (topicId: string) => void
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9.2], fov: 48 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Scene
        activeTopic={activeTopic}
        selectedCase={selectedCase}
        onSelectCase={onSelectCase}
        onSelectTopic={onSelectTopic}
      />
    </Canvas>
  )
}
