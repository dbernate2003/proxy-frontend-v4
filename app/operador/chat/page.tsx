"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Send, 
  Bot,
  User,
  MapPin,
  Phone,
  Camera,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Sparkles,
  ChevronRight
} from "lucide-react"
import { useState, useRef, useEffect } from "react"

type MessageRole = "assistant" | "user" | "system"

interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: string
  actions?: QuickAction[]
  context?: TaskContext
}

interface QuickAction {
  id: string
  label: string
  icon: "phone" | "camera" | "location" | "alert" | "check"
  action: string
}

interface TaskContext {
  taskId: string
  taskType: string
  location: string
  status: string
}

const quickReplies = [
  "Cliente no disponible",
  "Direccion incorrecta",
  "Problema con el paquete",
  "Necesito mas tiempo"
]

const aiResponses: Record<string, { content: string; actions?: QuickAction[] }> = {
  "cliente no disponible": {
    content: "Entendido. Sigue estos pasos:\n\n1. Intenta llamar al cliente (boton abajo)\n2. Espera 5 minutos\n3. Si no responde, toma foto de evidencia\n4. Reporta como intento fallido\n\nYo notificare al cliente automaticamente.",
    actions: [
      { id: "1", label: "Llamar cliente", icon: "phone", action: "call" },
      { id: "2", label: "Tomar foto", icon: "camera", action: "photo" },
      { id: "3", label: "Marcar intento", icon: "check", action: "attempt" }
    ]
  },
  "direccion incorrecta": {
    content: "Voy a verificar la direccion. Mientras tanto:\n\n1. Confirma tu ubicacion actual\n2. El cliente puede haber dejado indicaciones adicionales\n\nEstoy contactando al cliente para confirmar la direccion correcta.",
    actions: [
      { id: "1", label: "Ver en mapa", icon: "location", action: "map" },
      { id: "2", label: "Llamar cliente", icon: "phone", action: "call" }
    ]
  },
  "problema con el paquete": {
    content: "Describe el problema para poder ayudarte mejor:\n\n- Paquete danado?\n- Contenido incorrecto?\n- Falta documentacion?\n\nToma fotos del estado actual como evidencia.",
    actions: [
      { id: "1", label: "Tomar foto", icon: "camera", action: "photo" },
      { id: "2", label: "Reportar dano", icon: "alert", action: "damage" }
    ]
  },
  "necesito mas tiempo": {
    content: "Sin problema. He notificado al cliente sobre el retraso estimado.\n\nTiempo adicional autorizado: 15 minutos\n\nSi necesitas mas tiempo, avisame.",
    actions: [
      { id: "1", label: "Confirmar", icon: "check", action: "confirm" }
    ]
  },
  default: {
    content: "Entendido. Estoy procesando tu mensaje. Si es urgente, usa los botones de accion rapida o el boton de emergencia en la pantalla de tarea.",
    actions: [
      { id: "1", label: "Ver tarea", icon: "check", action: "task" }
    ]
  }
}

const initialMessages: Message[] = [
  {
    id: "welcome",
    role: "system",
    content: "Tarea activa detectada",
    timestamp: "",
    context: {
      taskId: "PRX-2847",
      taskType: "Entrega express",
      location: "Calle 85 #15-23",
      status: "En progreso"
    }
  },
  {
    id: "1",
    role: "assistant",
    content: "Hola Carlos. Estoy monitoreando tu tarea PRX-2847. En que puedo ayudarte?",
    timestamp: "10:30"
  }
]

const iconMap = {
  phone: Phone,
  camera: Camera,
  location: MapPin,
  alert: AlertTriangle,
  check: CheckCircle2
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = (userMessage: string): { content: string; actions?: QuickAction[] } => {
    const lower = userMessage.toLowerCase()
    for (const key of Object.keys(aiResponses)) {
      if (key !== "default" && lower.includes(key)) {
        return aiResponses[key]
      }
    }
    return aiResponses.default
  }

  const handleSend = (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return
    
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })
    }
    
    setMessages(prev => [...prev, newMessage])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const response = getAIResponse(messageText)
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.content,
        timestamp: new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }),
        actions: response.actions
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 800)
  }

  const handleAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      call: "Iniciando llamada al cliente...",
      photo: "Abriendo camara para evidencia...",
      map: "Abriendo mapa con la ubicacion...",
      attempt: "Registrando intento de entrega...",
      damage: "Abriendo formulario de reporte...",
      confirm: "Confirmado. Continua con la tarea.",
      task: "Redirigiendo a la tarea..."
    }

    const systemMessage: Message = {
      id: Date.now().toString(),
      role: "system",
      content: actionMessages[action] || "Accion ejecutada",
      timestamp: new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })
    }
    setMessages(prev => [...prev, systemMessage])
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-sm font-medium">Coordinador IA</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs text-muted-foreground">Activo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((message) => {
          if (message.role === "system" && message.context) {
            return (
              <div key={message.id} className="flex justify-center">
                <Card className="bg-secondary/50 border-border/30">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Clock className="w-3 h-3" />
                      <span>{message.content}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-medium">{message.context.taskId}</p>
                        <p className="text-[10px] text-muted-foreground">{message.context.location}</p>
                      </div>
                      <Badge variant="secondary" className="text-[10px]">
                        {message.context.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          }

          if (message.role === "system") {
            return (
              <div key={message.id} className="flex justify-center">
                <span className="text-xs text-muted-foreground bg-secondary/30 px-3 py-1 rounded-full">
                  {message.content}
                </span>
              </div>
            )
          }

          return (
            <div 
              key={message.id} 
              className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <Avatar className="w-7 h-7 flex-shrink-0">
                <AvatarFallback className={
                  message.role === "assistant" 
                    ? "bg-primary/10 text-primary text-xs" 
                    : "bg-secondary text-xs"
                }>
                  {message.role === "assistant" ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </AvatarFallback>
              </Avatar>
              <div className={`max-w-[80%] space-y-2 ${message.role === "user" ? "items-end" : ""}`}>
                <div className={`rounded-lg px-3 py-2 ${
                  message.role === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary/50"
                }`}>
                  <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                </div>
                
                {message.actions && message.actions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {message.actions.map((action) => {
                      const IconComponent = iconMap[action.icon]
                      return (
                        <Button
                          key={action.id}
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs gap-1.5 bg-background/50"
                          onClick={() => handleAction(action.action)}
                        >
                          <IconComponent className="w-3 h-3" />
                          {action.label}
                        </Button>
                      )
                    })}
                  </div>
                )}
                
                <span className={`text-[10px] text-muted-foreground block ${
                  message.role === "user" ? "text-right" : ""
                }`}>
                  {message.timestamp}
                </span>
              </div>
            </div>
          )
        })}

        {isTyping && (
          <div className="flex gap-2">
            <Avatar className="w-7 h-7 flex-shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                <Bot className="w-3.5 h-3.5" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-secondary/50 rounded-lg px-3 py-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-pulse" />
                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-pulse delay-75" />
                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-pulse delay-150" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div className="px-4 py-2 border-t border-border/30">
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {quickReplies.map((reply) => (
            <Button
              key={reply}
              variant="outline"
              size="sm"
              className="h-7 text-xs whitespace-nowrap flex-shrink-0 bg-background/50"
              onClick={() => handleSend(reply)}
            >
              {reply}
              <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border/50">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 h-9 text-sm bg-secondary/50 border-0"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button 
            size="icon" 
            className="h-9 w-9"
            onClick={() => handleSend()} 
            disabled={!input.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
