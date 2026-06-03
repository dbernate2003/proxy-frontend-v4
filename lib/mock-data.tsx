"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"

// Types
export interface Task {
  id: string
  title: string
  description: string
  type: "entrega" | "verificacion" | "fotografia" | "documentos" | "acompanamiento" | "investigacion"
  location: string
  address: string
  status: "created" | "pending" | "assigning" | "assigned" | "active" | "in-progress" | "completed" | "cancelled" | "failed"
  operator?: string
  operatorId?: string
  progress: number
  payout: number
  estimatedTime: string
  createdAt: string
  completedAt?: string
  evidence?: Evidence[]
  priority: "normal" | "urgente" | "programada"
  clientId: string
}

export interface Evidence {
  id: string
  type: "photo" | "video" | "signature" | "comment" | "location"
  url?: string
  content?: string
  timestamp: string
  label?: string
  coordinates?: { lat: number; lng: number }
}

export interface Operator {
  id: string
  name: string
  initials: string
  rating: number
  reviewsCount: number
  level: number
  status: "idle" | "active" | "offline" | "busy"
  verificationStatus: "pending" | "in-review" | "verified" | "rejected"
  city: string
  phone: string
  document: string
  certifications: string[]
  completedTasks: number
  earnings: number
  position?: { x: number; y: number }
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: string
  taskId?: string
}

export interface ClientBalance {
  available: number
  pending: number
  plan: "basico" | "profesional" | "enterprise"
}

export interface ApiKey {
  id: string
  name: string
  key: string
  fullKey: string
  created: string
  lastUsed: string
  status: "active" | "inactive"
}

// Initial mock data
const initialTasks: Task[] = [
  {
    id: "TASK-001",
    title: "Entrega de documentos legales",
    description: "Recoger y entregar sobre con documentos importantes",
    type: "documentos",
    location: "Usaquen",
    address: "Cra 7 #116-50, Bogota",
    status: "active",
    operator: "Carlos Martinez",
    operatorId: "op-1",
    progress: 65,
    payout: 18500,
    estimatedTime: "25-35 min",
    createdAt: "2024-06-30T10:30:00",
    priority: "normal",
    clientId: "client-1",
    evidence: [
      { id: "ev-1", type: "photo", timestamp: "2024-06-30T10:45:00", label: "Documento recogido" },
    ]
  },
  {
    id: "TASK-002",
    title: "Verificacion de direccion comercial",
    description: "Confirmar existencia de local comercial",
    type: "verificacion",
    location: "Chapinero",
    address: "Calle 53 #13-27, Bogota",
    status: "active",
    operator: "Maria Lopez",
    operatorId: "op-2",
    progress: 30,
    payout: 25000,
    estimatedTime: "15-25 min",
    createdAt: "2024-06-30T10:45:00",
    priority: "normal",
    clientId: "client-1"
  },
  {
    id: "TASK-003",
    title: "Fotografia de inventario",
    description: "Tomar fotos de inventario en bodega",
    type: "fotografia",
    location: "Fontibon",
    address: "Zona Franca, Bodega 15",
    status: "pending",
    progress: 0,
    payout: 45000,
    estimatedTime: "45-60 min",
    createdAt: "2024-06-30T11:00:00",
    priority: "normal",
    clientId: "client-1"
  },
  {
    id: "TASK-004",
    title: "Entrega express - Zona T",
    description: "Llevar paquete pequeno urgente",
    type: "entrega",
    location: "Zona T",
    address: "Cra 12 #83-17, Apto 501",
    status: "active",
    operator: "Laura Rodriguez",
    operatorId: "op-4",
    progress: 85,
    payout: 32000,
    estimatedTime: "20-30 min",
    createdAt: "2024-06-30T10:15:00",
    priority: "urgente",
    clientId: "client-1"
  },
  {
    id: "TASK-005",
    title: "Acompanamiento a cita medica",
    description: "Acompanar a persona mayor a cita medica",
    type: "acompanamiento",
    location: "Cedritos",
    address: "Calle 140 #15-22",
    status: "active",
    operator: "Diego Hernandez",
    operatorId: "op-5",
    progress: 45,
    payout: 55000,
    estimatedTime: "90-120 min",
    createdAt: "2024-06-30T09:30:00",
    priority: "normal",
    clientId: "client-1"
  }
]

const initialOperators: Operator[] = [
  {
    id: "op-1",
    name: "Carlos Martinez",
    initials: "CM",
    rating: 4.8,
    reviewsCount: 156,
    level: 3,
    status: "active",
    verificationStatus: "verified",
    city: "Bogota",
    phone: "+57 315 123 4567",
    document: "1234567890",
    certifications: ["Verificado", "Logistica", "Fotografia"],
    completedTasks: 247,
    earnings: 1250000,
    position: { x: 60, y: 45 }
  },
  {
    id: "op-2",
    name: "Maria Lopez",
    initials: "ML",
    rating: 4.9,
    reviewsCount: 98,
    level: 3,
    status: "active",
    verificationStatus: "verified",
    city: "Bogota",
    phone: "+57 318 987 6543",
    document: "0987654321",
    certifications: ["Verificado", "Inspecciones"],
    completedTasks: 189,
    earnings: 980000,
    position: { x: 45, y: 30 }
  },
  {
    id: "op-3",
    name: "Andres Garcia",
    initials: "AG",
    rating: 4.5,
    reviewsCount: 67,
    level: 2,
    status: "idle",
    verificationStatus: "in-review",
    city: "Bogota",
    phone: "+57 320 456 7890",
    document: "5678901234",
    certifications: ["Fotografia"],
    completedTasks: 85,
    earnings: 450000,
    position: { x: 70, y: 55 }
  },
  {
    id: "op-4",
    name: "Laura Rodriguez",
    initials: "LR",
    rating: 4.7,
    reviewsCount: 124,
    level: 3,
    status: "active",
    verificationStatus: "verified",
    city: "Bogota",
    phone: "+57 312 234 5678",
    document: "3456789012",
    certifications: ["Verificado", "Logistica", "Acompanamiento"],
    completedTasks: 198,
    earnings: 1100000,
    position: { x: 35, y: 65 }
  },
  {
    id: "op-5",
    name: "Diego Hernandez",
    initials: "DH",
    rating: 4.6,
    reviewsCount: 89,
    level: 2,
    status: "active",
    verificationStatus: "verified",
    city: "Bogota",
    phone: "+57 316 789 0123",
    document: "7890123456",
    certifications: ["Verificado", "Acompanamiento"],
    completedTasks: 132,
    earnings: 750000,
    position: { x: 55, y: 40 }
  }
]

const initialApiKeys: ApiKey[] = [
  {
    id: "1",
    name: "Produccion",
    key: "pk_live_************************",
    fullKey: "pk_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    created: "Jun 15, 2024",
    lastUsed: "Hace 2 horas",
    status: "active",
  },
  {
    id: "2",
    name: "Desarrollo",
    key: "pk_test_************************",
    fullKey: "pk_test_x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6",
    created: "Jun 10, 2024",
    lastUsed: "Hace 5 min",
    status: "active",
  }
]

// Context
interface MockDataContextType {
  // Tasks
  tasks: Task[]
  addTask: (task: Omit<Task, "id" | "createdAt" | "status" | "progress">) => Task
  updateTask: (id: string, updates: Partial<Task>) => void
  getTaskById: (id: string) => Task | undefined
  getActiveTasks: () => Task[]
  getCompletedTasks: () => Task[]
  
  // Operators
  operators: Operator[]
  updateOperator: (id: string, updates: Partial<Operator>) => void
  getOperatorById: (id: string) => Operator | undefined
  currentOperator: Operator | null
  setCurrentOperator: (op: Operator | null) => void
  
  // Client balance
  clientBalance: ClientBalance
  updateBalance: (amount: number) => void
  addCredits: (amount: number) => void
  
  // Chat messages
  chatMessages: ChatMessage[]
  addChatMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void
  
  // API Keys
  apiKeys: ApiKey[]
  addApiKey: (name: string) => ApiKey
  revokeApiKey: (id: string) => void
  regenerateApiKey: (id: string) => ApiKey | undefined
  
  // Simulation
  simulationEvents: SimulationEvent[]
  addSimulationEvent: (event: Omit<SimulationEvent, "id" | "timestamp">) => void
  clearSimulationEvents: () => void
}

export interface SimulationEvent {
  id: string
  type: "task_created" | "ai_analyzing" | "operator_assigned" | "operator_moving" | "task_started" | "evidence_uploaded" | "task_completed"
  taskId?: string
  operatorId?: string
  description: string
  details?: string
  timestamp: string
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined)

export function MockDataProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [operators, setOperators] = useState<Operator[]>(initialOperators)
  const [currentOperator, setCurrentOperator] = useState<Operator | null>(initialOperators[0])
  const [clientBalance, setClientBalance] = useState<ClientBalance>({
    available: 2450000,
    pending: 0,
    plan: "enterprise"
  })
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialApiKeys)
  const [simulationEvents, setSimulationEvents] = useState<SimulationEvent[]>([])

  // Task functions
  const addTask = useCallback((taskData: Omit<Task, "id" | "createdAt" | "status" | "progress">) => {
    const newTask: Task = {
      ...taskData,
      id: `TASK-${String(tasks.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString(),
      status: "created",
      progress: 0
    }
    setTasks(prev => [...prev, newTask])
    
    // Deduct from balance
    setClientBalance(prev => ({
      ...prev,
      available: prev.available - taskData.payout,
      pending: prev.pending + taskData.payout
    }))
    
    return newTask
  }, [tasks.length])

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
  }, [])

  const getTaskById = useCallback((id: string) => {
    return tasks.find(t => t.id === id || t.id === `TASK-${id}`)
  }, [tasks])

  const getActiveTasks = useCallback(() => {
    return tasks.filter(t => ["created", "pending", "assigning", "assigned", "active", "in-progress"].includes(t.status))
  }, [tasks])

  const getCompletedTasks = useCallback(() => {
    return tasks.filter(t => ["completed", "cancelled", "failed"].includes(t.status))
  }, [tasks])

  // Operator functions
  const updateOperator = useCallback((id: string, updates: Partial<Operator>) => {
    setOperators(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o))
  }, [])

  const getOperatorById = useCallback((id: string) => {
    return operators.find(o => o.id === id)
  }, [operators])

  // Balance functions
  const updateBalance = useCallback((amount: number) => {
    setClientBalance(prev => ({
      ...prev,
      available: prev.available + amount
    }))
  }, [])

  const addCredits = useCallback((amount: number) => {
    setClientBalance(prev => ({
      ...prev,
      available: prev.available + amount
    }))
  }, [])

  // Chat functions
  const addChatMessage = useCallback((message: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMessage: ChatMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })
    }
    setChatMessages(prev => [...prev, newMessage])
  }, [])

  // API Key functions
  const generateKey = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
    let key = ""
    for (let i = 0; i < 32; i++) {
      key += chars[Math.floor(Math.random() * chars.length)]
    }
    return key
  }

  const addApiKey = useCallback((name: string) => {
    const fullKey = `pk_test_${generateKey()}`
    const newKey: ApiKey = {
      id: String(Date.now()),
      name,
      key: `pk_test_${"*".repeat(24)}`,
      fullKey,
      created: new Date().toLocaleDateString("es-CO", { month: "short", day: "numeric", year: "numeric" }),
      lastUsed: "Nunca",
      status: "active"
    }
    setApiKeys(prev => [...prev, newKey])
    return newKey
  }, [])

  const revokeApiKey = useCallback((id: string) => {
    setApiKeys(prev => prev.map(k => k.id === id ? { ...k, status: "inactive" as const } : k))
  }, [])

  const regenerateApiKey = useCallback((id: string) => {
    const fullKey = `pk_test_${generateKey()}`
    let updatedKey: ApiKey | undefined
    setApiKeys(prev => prev.map(k => {
      if (k.id === id) {
        updatedKey = {
          ...k,
          key: `pk_test_${"*".repeat(24)}`,
          fullKey,
          lastUsed: "Ahora"
        }
        return updatedKey
      }
      return k
    }))
    return updatedKey
  }, [])

  // Simulation functions
  const addSimulationEvent = useCallback((event: Omit<SimulationEvent, "id" | "timestamp">) => {
    const newEvent: SimulationEvent = {
      ...event,
      id: `sim-${Date.now()}`,
      timestamp: new Date().toISOString()
    }
    setSimulationEvents(prev => [...prev.slice(-20), newEvent])
  }, [])

  const clearSimulationEvents = useCallback(() => {
    setSimulationEvents([])
  }, [])

  return (
    <MockDataContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        getTaskById,
        getActiveTasks,
        getCompletedTasks,
        operators,
        updateOperator,
        getOperatorById,
        currentOperator,
        setCurrentOperator,
        clientBalance,
        updateBalance,
        addCredits,
        chatMessages,
        addChatMessage,
        apiKeys,
        addApiKey,
        revokeApiKey,
        regenerateApiKey,
        simulationEvents,
        addSimulationEvent,
        clearSimulationEvents
      }}
    >
      {children}
    </MockDataContext.Provider>
  )
}

export function useMockData() {
  const context = useContext(MockDataContext)
  if (context === undefined) {
    throw new Error("useMockData must be used within a MockDataProvider")
  }
  return context
}

// Helper to get task type icon name
export function getTaskTypeIcon(type: Task["type"]) {
  const icons: Record<Task["type"], string> = {
    entrega: "Package",
    verificacion: "Search",
    fotografia: "Camera",
    documentos: "FileText",
    acompanamiento: "Users",
    investigacion: "Microscope"
  }
  return icons[type]
}

// Helper to get verification status info
export function getVerificationStatusInfo(status: Operator["verificationStatus"]) {
  const info: Record<Operator["verificationStatus"], { label: string; color: string; description: string }> = {
    pending: {
      label: "Pendiente",
      color: "amber",
      description: "Tu solicitud esta pendiente de revision. Completa todos los pasos requeridos."
    },
    "in-review": {
      label: "En revision",
      color: "primary",
      description: "Estamos verificando tu informacion. Este proceso puede tomar 24-48 horas."
    },
    verified: {
      label: "Verificado",
      color: "emerald",
      description: "Tu identidad ha sido verificada. Ya puedes aceptar tareas."
    },
    rejected: {
      label: "Rechazado",
      color: "red",
      description: "Tu verificacion fue rechazada. Contacta soporte para mas informacion."
    }
  }
  return info[status]
}
