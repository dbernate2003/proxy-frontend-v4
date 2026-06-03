"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StatusBadge } from "@/components/status-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { 
  Key, 
  Plus, 
  Copy, 
  Eye, 
  EyeOff,
  Trash2,
  AlertTriangle,
  Code,
  ExternalLink,
  CheckCircle,
  RotateCw,
  Terminal,
  FileJson,
  Globe,
  Shield,
  Loader2,
  Book
} from "lucide-react"
import { FadeIn, PageTransition } from "@/components/motion-primitives"
import { cn } from "@/lib/utils"

const apiKeys = [
  {
    id: "1",
    name: "Produccion",
    key: "pk_live_************************",
    fullKey: "pk_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    created: "Jun 15, 2024",
    lastUsed: "Hace 2 horas",
    status: "active",
    environment: "production"
  },
  {
    id: "2",
    name: "Desarrollo",
    key: "pk_test_************************",
    fullKey: "pk_test_x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6",
    created: "Jun 10, 2024",
    lastUsed: "Hace 5 min",
    status: "active",
    environment: "development"
  },
  {
    id: "3",
    name: "Staging (antigua)",
    key: "pk_test_************************",
    fullKey: "pk_test_old_deprecated_key_12345",
    created: "Ene 20, 2024",
    lastUsed: "Hace 30 dias",
    status: "inactive",
    environment: "development"
  },
]

const codeExamples = {
  create: {
    curl: `curl -X POST https://api.proxy.co/v1/tasks \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "delivery",
    "title": "Entrega de documentos",
    "address": "Cra 7 #116-50, Bogota",
    "priority": "normal",
    "evidence": ["photos", "signature"]
  }'`,
    javascript: `const response = await fetch('https://api.proxy.co/v1/tasks', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    type: 'delivery',
    title: 'Entrega de documentos',
    address: 'Cra 7 #116-50, Bogota',
    priority: 'normal',
    evidence: ['photos', 'signature']
  })
});

const task = await response.json();
console.log('Task created:', task.id);`,
    python: `import requests

response = requests.post(
    'https://api.proxy.co/v1/tasks',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'type': 'delivery',
        'title': 'Entrega de documentos',
        'address': 'Cra 7 #116-50, Bogota',
        'priority': 'normal',
        'evidence': ['photos', 'signature']
    }
)

task = response.json()
print(f"Task created: {task['id']}")`
  },
  status: {
    curl: `curl https://api.proxy.co/v1/tasks/TASK-001 \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    javascript: `const response = await fetch('https://api.proxy.co/v1/tasks/TASK-001', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

const task = await response.json();
console.log('Task status:', task.status);
console.log('Progress:', task.progress);`,
    python: `import requests

response = requests.get(
    'https://api.proxy.co/v1/tasks/TASK-001',
    headers={'Authorization': 'Bearer YOUR_API_KEY'}
)

task = response.json()
print(f"Status: {task['status']}")
print(f"Progress: {task['progress']}%")`
  },
  webhook: {
    curl: `# Configure webhook en tu dashboard
# POST a tu endpoint cuando una tarea cambia de estado

# Payload de ejemplo:
{
  "event": "task.completed",
  "task_id": "TASK-001",
  "timestamp": "2024-06-30T14:30:00Z",
  "data": {
    "status": "completed",
    "operator": "Carlos Martinez",
    "evidence": [...],
    "duration_minutes": 28
  }
}`,
    javascript: `// Express.js webhook handler
app.post('/webhooks/proxy', (req, res) => {
  const { event, task_id, data } = req.body;
  
  switch (event) {
    case 'task.assigned':
      console.log(\`Task \${task_id} assigned to \${data.operator}\`);
      break;
    case 'task.completed':
      console.log(\`Task \${task_id} completed in \${data.duration_minutes} min\`);
      // Update your database
      break;
    case 'task.failed':
      console.log(\`Task \${task_id} failed: \${data.reason}\`);
      break;
  }
  
  res.status(200).send('OK');
});`,
    python: `# Flask webhook handler
@app.route('/webhooks/proxy', methods=['POST'])
def handle_webhook():
    event = request.json.get('event')
    task_id = request.json.get('task_id')
    data = request.json.get('data')
    
    if event == 'task.assigned':
        print(f"Task {task_id} assigned to {data['operator']}")
    elif event == 'task.completed':
        print(f"Task {task_id} completed in {data['duration_minutes']} min")
        # Update your database
    elif event == 'task.failed':
        print(f"Task {task_id} failed: {data['reason']}")
    
    return 'OK', 200`
  }
}

const endpoints = [
  {
    method: "POST",
    path: "/v1/tasks",
    description: "Crear una nueva tarea",
    methodColor: "bg-emerald-500"
  },
  {
    method: "GET",
    path: "/v1/tasks",
    description: "Listar todas las tareas",
    methodColor: "bg-blue-500"
  },
  {
    method: "GET",
    path: "/v1/tasks/:id",
    description: "Obtener detalles de una tarea",
    methodColor: "bg-blue-500"
  },
  {
    method: "DELETE",
    path: "/v1/tasks/:id",
    description: "Cancelar una tarea",
    methodColor: "bg-red-500"
  },
  {
    method: "GET",
    path: "/v1/operators",
    description: "Listar operadores disponibles",
    methodColor: "bg-blue-500"
  },
  {
    method: "GET",
    path: "/v1/balance",
    description: "Consultar saldo disponible",
    methodColor: "bg-blue-500"
  }
]

export default function ApiKeysPage() {
  const [keys, setKeys] = useState(apiKeys)
  const [visibleKeys, setVisibleKeys] = useState<string[]>([])
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null)
  const [newKeyName, setNewKeyName] = useState("")
  const [newKeyEnvironment, setNewKeyEnvironment] = useState<"production" | "development">("development")
  const [isCreating, setIsCreating] = useState(false)
  const [activeCodeTab, setActiveCodeTab] = useState("curl")
  const [activeExample, setActiveExample] = useState<"create" | "status" | "webhook">("create")

  const toggleKeyVisibility = (keyId: string) => {
    if (visibleKeys.includes(keyId)) {
      setVisibleKeys(visibleKeys.filter(id => id !== keyId))
    } else {
      setVisibleKeys([...visibleKeys, keyId])
    }
  }

  const copyToClipboard = (key: string, keyId: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(keyId)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return
    setIsCreating(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const prefix = newKeyEnvironment === "production" ? "pk_live_" : "pk_test_"
    const randomKey = Array.from({ length: 32 }, () => 
      "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)]
    ).join("")
    
    const newKey = {
      id: String(Date.now()),
      name: newKeyName,
      key: `${prefix}${"*".repeat(24)}`,
      fullKey: `${prefix}${randomKey}`,
      created: new Date().toLocaleDateString("es-CO", { month: "short", day: "numeric", year: "numeric" }),
      lastUsed: "Nunca",
      status: "active" as const,
      environment: newKeyEnvironment
    }
    
    setKeys([...keys, newKey])
    setIsCreating(false)
    setShowCreateDialog(false)
    setNewKeyName("")
    
    // Show the new key
    setVisibleKeys([...visibleKeys, newKey.id])
    copyToClipboard(newKey.fullKey, newKey.id)
  }

  const handleDeleteKey = (keyId: string) => {
    setKeys(keys.filter(k => k.id !== keyId))
    setShowDeleteDialog(null)
  }

  const handleRegenerateKey = (keyId: string) => {
    const prefix = keys.find(k => k.id === keyId)?.environment === "production" ? "pk_live_" : "pk_test_"
    const randomKey = Array.from({ length: 32 }, () => 
      "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)]
    ).join("")
    
    setKeys(keys.map(k => k.id === keyId ? {
      ...k,
      key: `${prefix}${"*".repeat(24)}`,
      fullKey: `${prefix}${randomKey}`,
      lastUsed: "Ahora"
    } : k))
    
    copyToClipboard(`${prefix}${randomKey}`, keyId)
    setVisibleKeys([...visibleKeys, keyId])
  }

  return (
    <PageTransition className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">API Keys</h1>
          <p className="text-muted-foreground">Gestiona tus claves de acceso a la API de PROXY</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Crear nueva API Key
        </Button>
      </div>

      {/* Warning */}
      <FadeIn>
        <Card className="bg-amber-500/10 border-amber-500/20">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-400">Manten tus API Keys seguras</p>
              <p className="text-sm text-muted-foreground mt-1">
                Nunca compartas tus claves de produccion ni las expongas en codigo del lado del cliente.
                Usa variables de entorno para almacenarlas de forma segura.
              </p>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* API Keys list */}
      <div className="space-y-4">
        <AnimatePresence>
          {keys.map((apiKey, index) => (
            <FadeIn key={apiKey.id} delay={index * 0.1}>
              <Card className={cn(
                "bg-card/50 border-border/50",
                apiKey.status === "inactive" && "opacity-60"
              )}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                        apiKey.environment === "production" 
                          ? "bg-amber-500/10" 
                          : "bg-primary/10"
                      )}>
                        <Key className={cn(
                          "w-5 h-5",
                          apiKey.environment === "production" 
                            ? "text-amber-400" 
                            : "text-primary"
                        )} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold">{apiKey.name}</h3>
                          <StatusBadge status={apiKey.status === "active" ? "active" : "cancelled"}>
                            {apiKey.status === "active" ? "Activa" : "Inactiva"}
                          </StatusBadge>
                          <StatusBadge status={apiKey.environment === "production" ? "urgent" : "pending"}>
                            {apiKey.environment === "production" ? "Produccion" : "Desarrollo"}
                          </StatusBadge>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <code className="text-sm font-mono bg-secondary px-2 py-1 rounded">
                            {visibleKeys.includes(apiKey.id) ? apiKey.fullKey : apiKey.key}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-7 h-7"
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                          >
                            {visibleKeys.includes(apiKey.id) ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-7 h-7"
                            onClick={() => copyToClipboard(apiKey.fullKey, apiKey.id)}
                          >
                            {copiedKey === apiKey.id ? (
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Creada: {apiKey.created} - Ultimo uso: {apiKey.lastUsed}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRegenerateKey(apiKey.id)}
                      >
                        <RotateCw className="w-4 h-4 mr-2" />
                        Regenerar
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive"
                        onClick={() => setShowDeleteDialog(apiKey.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </AnimatePresence>
      </div>

      {/* API Documentation */}
      <FadeIn delay={0.3}>
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Book className="w-5 h-5 text-primary" />
              Documentacion de la API
            </CardTitle>
            <CardDescription>
              Aprende a integrar PROXY en tus aplicaciones con estos ejemplos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Endpoints reference */}
            <div>
              <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                Endpoints disponibles
              </h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {endpoints.map((endpoint, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                  >
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded text-white",
                      endpoint.methodColor
                    )}>
                      {endpoint.method}
                    </span>
                    <code className="text-xs font-mono">{endpoint.path}</code>
                    <span className="text-xs text-muted-foreground ml-auto hidden sm:block">
                      {endpoint.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code examples */}
            <div>
              <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                Ejemplos de codigo
              </h4>
              
              {/* Example selector */}
              <div className="flex gap-2 mb-4">
                <Button 
                  variant={activeExample === "create" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveExample("create")}
                >
                  Crear tarea
                </Button>
                <Button 
                  variant={activeExample === "status" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveExample("status")}
                >
                  Consultar estado
                </Button>
                <Button 
                  variant={activeExample === "webhook" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveExample("webhook")}
                >
                  Webhooks
                </Button>
              </div>

              <Tabs value={activeCodeTab} onValueChange={setActiveCodeTab}>
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="curl" className="gap-2">
                    <Terminal className="w-3 h-3" />
                    cURL
                  </TabsTrigger>
                  <TabsTrigger value="javascript" className="gap-2">
                    <FileJson className="w-3 h-3" />
                    JavaScript
                  </TabsTrigger>
                  <TabsTrigger value="python" className="gap-2">
                    <Code className="w-3 h-3" />
                    Python
                  </TabsTrigger>
                </TabsList>

                {(["curl", "javascript", "python"] as const).map(lang => (
                  <TabsContent key={lang} value={lang}>
                    <div className="relative">
                      <pre className="bg-secondary rounded-lg p-4 overflow-x-auto text-sm font-mono">
                        <code className="text-muted-foreground">
                          {codeExamples[activeExample][lang]}
                        </code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          navigator.clipboard.writeText(codeExamples[activeExample][lang])
                          setCopiedKey(`code-${lang}`)
                          setTimeout(() => setCopiedKey(null), 2000)
                        }}
                      >
                        {copiedKey === `code-${lang}` ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Documentation link */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Para mas detalles, consulta nuestra documentacion completa
              </p>
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Ver documentacion
              </Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Create Key Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear nueva API Key</DialogTitle>
            <DialogDescription>
              Crea una nueva clave de acceso para integrar PROXY en tus aplicaciones
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="keyName">Nombre de la clave</Label>
              <Input
                id="keyName"
                placeholder="Ej: Produccion, Desarrollo, Mi App..."
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="bg-secondary border-0"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Entorno</Label>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={cn(
                    "p-4 rounded-lg border-2 cursor-pointer transition-all",
                    newKeyEnvironment === "development"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => setNewKeyEnvironment("development")}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="font-medium">Desarrollo</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Para pruebas y desarrollo. Sin costo por uso.
                  </p>
                </div>
                <div
                  className={cn(
                    "p-4 rounded-lg border-2 cursor-pointer transition-all",
                    newKeyEnvironment === "production"
                      ? "border-amber-500 bg-amber-500/10"
                      : "border-border hover:border-amber-500/50"
                  )}
                  onClick={() => setNewKeyEnvironment("production")}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span className="font-medium">Produccion</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Para uso real. Las tareas generan costos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateKey} disabled={!newKeyName.trim() || isCreating}>
              {isCreating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creando...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Crear API Key
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!showDeleteDialog} onOpenChange={() => setShowDeleteDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revocar API Key</DialogTitle>
            <DialogDescription>
              Esta seguro de que desea revocar esta API Key? Esta accion no se puede deshacer
              y cualquier aplicacion que la use dejara de funcionar inmediatamente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(null)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => showDeleteDialog && handleDeleteKey(showDeleteDialog)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Revocar clave
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageTransition>
  )
}
