"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Node {
  id: string
  type: "client" | "ai" | "operator"
  x: number
  y: number
  label?: string
  status?: "idle" | "active" | "completed"
}

interface Connection {
  from: string
  to: string
  active: boolean
  progress: number
}

interface Particle {
  id: string
  fromNode: string
  toNode: string
  progress: number
  color: string
}

interface AINetworkProps {
  className?: string
  density?: "low" | "medium" | "high"
  interactive?: boolean
  showLabels?: boolean
}

const nodeColors = {
  client: "oklch(0.8 0.15 85)", // Amber
  ai: "oklch(0.75 0.15 195)", // Cyan (primary)
  operator: "oklch(0.7 0.18 145)", // Green
}

const glowColors = {
  client: "oklch(0.8 0.15 85 / 0.4)",
  ai: "oklch(0.75 0.15 195 / 0.5)",
  operator: "oklch(0.7 0.18 145 / 0.4)",
}

export function AINetwork({ 
  className = "", 
  density = "medium",
  interactive = true,
  showLabels = false 
}: AINetworkProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [nodes, setNodes] = useState<Node[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 })

  // Initialize nodes based on density
  useEffect(() => {
    const counts = {
      low: { clients: 2, operators: 3 },
      medium: { clients: 4, operators: 6 },
      high: { clients: 6, operators: 10 },
    }

    const { clients, operators } = counts[density]
    const newNodes: Node[] = []

    // AI node at center
    newNodes.push({
      id: "ai-core",
      type: "ai",
      x: 50,
      y: 50,
      label: "PROXY AI",
      status: "active",
    })

    // Client nodes on the left
    for (let i = 0; i < clients; i++) {
      newNodes.push({
        id: `client-${i}`,
        type: "client",
        x: 10 + Math.random() * 20,
        y: 15 + (i * 70) / clients + Math.random() * 10,
        label: `Cliente ${i + 1}`,
        status: Math.random() > 0.5 ? "active" : "idle",
      })
    }

    // Operator nodes on the right
    for (let i = 0; i < operators; i++) {
      newNodes.push({
        id: `operator-${i}`,
        type: "operator",
        x: 70 + Math.random() * 20,
        y: 10 + (i * 80) / operators + Math.random() * 10,
        label: `Operador ${i + 1}`,
        status: Math.random() > 0.3 ? "active" : "idle",
      })
    }

    setNodes(newNodes)

    // Create connections
    const newConnections: Connection[] = []
    newNodes.forEach((node) => {
      if (node.type !== "ai") {
        newConnections.push({
          from: node.id,
          to: "ai-core",
          active: node.status === "active",
          progress: Math.random(),
        })
      }
    })
    setConnections(newConnections)
  }, [density])

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      // Add new particles
      const activeConnections = connections.filter((c) => c.active)
      if (activeConnections.length > 0 && Math.random() > 0.6) {
        const conn = activeConnections[Math.floor(Math.random() * activeConnections.length)]
        const fromNode = nodes.find((n) => n.id === conn.from)
        const direction = Math.random() > 0.5 ? "forward" : "backward"
        
        setParticles((prev) => [
          ...prev.slice(-20), // Keep max 20 particles
          {
            id: `particle-${Date.now()}-${Math.random()}`,
            fromNode: direction === "forward" ? conn.from : conn.to,
            toNode: direction === "forward" ? conn.to : conn.from,
            progress: 0,
            color: fromNode?.type ? nodeColors[fromNode.type] : nodeColors.ai,
          },
        ])
      }

      // Update particle positions
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, progress: p.progress + 0.02 }))
          .filter((p) => p.progress < 1)
      )
    }, 50)

    return () => clearInterval(interval)
  }, [connections, nodes])

  // Animate node positions slightly
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
          x: node.type === "ai" ? 50 : Math.max(5, Math.min(95, node.x + (Math.random() - 0.5) * 0.5)),
          y: node.type === "ai" ? 50 : Math.max(5, Math.min(95, node.y + (Math.random() - 0.5) * 0.5)),
        }))
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Toggle node status on click
  const handleNodeClick = (nodeId: string) => {
    if (!interactive) return
    setNodes((prev) =>
      prev.map((n) =>
        n.id === nodeId
          ? { ...n, status: n.status === "active" ? "idle" : "active" }
          : n
      )
    )
    setConnections((prev) =>
      prev.map((c) =>
        c.from === nodeId || c.to === nodeId
          ? { ...c, active: !c.active }
          : c
      )
    )
  }

  const getNodePosition = (node: Node) => ({
    x: (node.x / 100) * dimensions.width,
    y: (node.y / 100) * dimensions.height,
  })

  const getParticlePosition = (particle: Particle) => {
    const from = nodes.find((n) => n.id === particle.fromNode)
    const to = nodes.find((n) => n.id === particle.toNode)
    if (!from || !to) return { x: 0, y: 0 }

    const fromPos = getNodePosition(from)
    const toPos = getNodePosition(to)

    return {
      x: fromPos.x + (toPos.x - fromPos.x) * particle.progress,
      y: fromPos.y + (toPos.y - fromPos.y) * particle.progress,
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-gradient-to-br from-background via-background to-card/50 ${className}`}
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-border"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* SVG for connections and particles */}
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Glow filters */}
          <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-amber" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        {connections.map((conn) => {
          const from = nodes.find((n) => n.id === conn.from)
          const to = nodes.find((n) => n.id === conn.to)
          if (!from || !to) return null

          const fromPos = getNodePosition(from)
          const toPos = getNodePosition(to)

          return (
            <motion.line
              key={`${conn.from}-${conn.to}`}
              x1={fromPos.x}
              y1={fromPos.y}
              x2={toPos.x}
              y2={toPos.y}
              stroke={conn.active ? "oklch(0.75 0.15 195 / 0.4)" : "oklch(0.3 0.02 250)"}
              strokeWidth={conn.active ? 2 : 1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          )
        })}

        {/* Particles */}
        <AnimatePresence>
          {particles.map((particle) => {
            const pos = getParticlePosition(particle)
            return (
              <motion.circle
                key={particle.id}
                cx={pos.x}
                cy={pos.y}
                r={4}
                fill={particle.color}
                filter="url(#glow-cyan)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              />
            )
          })}
        </AnimatePresence>
      </svg>

      {/* Nodes */}
      {nodes.map((node) => {
        const pos = getNodePosition(node)
        const size = node.type === "ai" ? 56 : 40

        return (
          <motion.div
            key={node.id}
            className={`absolute flex flex-col items-center ${interactive ? "cursor-pointer" : ""}`}
            style={{
              left: pos.x - size / 2,
              top: pos.y - size / 2,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => handleNodeClick(node.id)}
            whileHover={interactive ? { scale: 1.1 } : {}}
            whileTap={interactive ? { scale: 0.95 } : {}}
          >
            {/* Glow effect */}
            {node.status === "active" && (
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: size + 20,
                  height: size + 20,
                  left: -10,
                  top: -10,
                  background: `radial-gradient(circle, ${glowColors[node.type]} 0%, transparent 70%)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Node circle */}
            <motion.div
              className="relative flex items-center justify-center rounded-full border-2"
              style={{
                width: size,
                height: size,
                backgroundColor:
                  node.status === "active"
                    ? `color-mix(in oklch, ${nodeColors[node.type]} 20%, transparent)`
                    : "oklch(0.15 0.02 250)",
                borderColor:
                  node.status === "active" ? nodeColors[node.type] : "oklch(0.3 0.02 250)",
              }}
              animate={
                node.status === "active"
                  ? {
                      boxShadow: [
                        `0 0 10px ${glowColors[node.type]}`,
                        `0 0 20px ${glowColors[node.type]}`,
                        `0 0 10px ${glowColors[node.type]}`,
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Icon based on type */}
              {node.type === "ai" && (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={nodeColors.ai} strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              )}
              {node.type === "client" && (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={nodeColors.client} strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 9h6v6H9z" />
                </svg>
              )}
              {node.type === "operator" && (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={nodeColors.operator} strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
                </svg>
              )}
            </motion.div>

            {/* Label */}
            {showLabels && node.label && (
              <motion.span
                className="mt-2 text-xs font-medium whitespace-nowrap"
                style={{ color: node.status === "active" ? nodeColors[node.type] : "oklch(0.5 0 0)" }}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {node.label}
              </motion.span>
            )}
          </motion.div>
        )
      })}

      {/* Center label for AI */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-8 text-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-xs font-semibold text-primary tracking-wider">PROXY AI</span>
        <span className="block text-[10px] text-muted-foreground">Coordinando</span>
      </motion.div>
    </div>
  )
}
