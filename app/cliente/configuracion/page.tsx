"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Building2, 
  User, 
  Bell, 
  Shield,
  Globe,
  Mail,
  Phone,
  MapPin,
  Save,
  Check,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function ConfiguracionPage() {
  // Company info state
  const [companyName, setCompanyName] = useState("Empresa Demo S.A.S")
  const [nit, setNit] = useState("900.123.456-7")
  const [industry, setIndustry] = useState("Tecnologia")
  const [size, setSize] = useState("50-100 empleados")
  
  // Contact info state
  const [contactName, setContactName] = useState("Juan Perez")
  const [role, setRole] = useState("Director de Operaciones")
  const [email, setEmail] = useState("juan.perez@empresademo.com")
  const [phone, setPhone] = useState("+57 315 123 4567")
  const [address, setAddress] = useState("Cra 7 #71-21, Torre A, Oficina 1502, Bogota")
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [taskCompleted, setTaskCompleted] = useState(true)
  const [problemAlerts, setProblemAlerts] = useState(true)
  const [weeklySummary, setWeeklySummary] = useState(false)
  
  // Save state
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    setSaved(false)
    
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSaving(false)
    setSaved(true)
    
    // Reset saved indicator after 3 seconds
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Configuracion</h1>
          <p className="text-muted-foreground">Gestiona la configuracion de tu cuenta y empresa</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 text-emerald-500 text-sm">
            <Check className="w-4 h-4" />
            Guardado exitosamente
          </div>
        )}
      </div>

      {/* Company info */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Informacion de la empresa
          </CardTitle>
          <CardDescription>
            Datos basicos de tu organizacion
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-primary/20 text-primary text-xl font-bold">
                ED
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">Cambiar logo</Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Nombre de la empresa</Label>
              <Input 
                id="company" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="bg-secondary border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nit">NIT</Label>
              <Input 
                id="nit" 
                value={nit}
                onChange={(e) => setNit(e.target.value)}
                className="bg-secondary border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industria</Label>
              <Input 
                id="industry" 
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="bg-secondary border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Tamano</Label>
              <Input 
                id="size" 
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="bg-secondary border-0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact info */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Informacion de contacto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Nombre del contacto</Label>
              <Input 
                id="contact-name" 
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="bg-secondary border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Cargo</Label>
              <Input 
                id="role" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-secondary border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input 
                id="email" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telefono
              </Label>
              <Input 
                id="phone" 
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-secondary border-0"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Direccion
              </Label>
              <Input 
                id="address" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-secondary border-0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Notificaciones
          </CardTitle>
          <CardDescription>
            Configura como quieres recibir alertas y actualizaciones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notificaciones por email</p>
              <p className="text-sm text-muted-foreground">
                Recibe actualizaciones sobre tus tareas por correo
              </p>
            </div>
            <Switch 
              checked={emailNotifications} 
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Alertas de tarea completada</p>
              <p className="text-sm text-muted-foreground">
                Notificacion inmediata cuando una tarea se completa
              </p>
            </div>
            <Switch 
              checked={taskCompleted} 
              onCheckedChange={setTaskCompleted}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Alertas de problemas</p>
              <p className="text-sm text-muted-foreground">
                Notificacion cuando hay un problema con una tarea
              </p>
            </div>
            <Switch 
              checked={problemAlerts} 
              onCheckedChange={setProblemAlerts}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Resumen semanal</p>
              <p className="text-sm text-muted-foreground">
                Reporte semanal de actividad por email
              </p>
            </div>
            <Switch 
              checked={weeklySummary} 
              onCheckedChange={setWeeklySummary}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Seguridad
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Autenticacion de dos factores</p>
              <p className="text-sm text-muted-foreground">
                Agrega una capa adicional de seguridad a tu cuenta
              </p>
            </div>
            <Button variant="outline" size="sm">Configurar</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Cambiar contrasena</p>
              <p className="text-sm text-muted-foreground">
                Ultima actualizacion hace 45 dias
              </p>
            </div>
            <Button variant="outline" size="sm">Cambiar</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Sesiones activas</p>
              <p className="text-sm text-muted-foreground">
                2 dispositivos conectados
              </p>
            </div>
            <Button variant="outline" size="sm">Ver sesiones</Button>
          </div>
        </CardContent>
      </Card>

      {/* Save button */}
      <div className="flex justify-end">
        <Button 
          size="lg" 
          onClick={handleSave}
          disabled={isSaving}
          className={cn(
            "min-w-[180px]",
            saved && "bg-emerald-500 hover:bg-emerald-600"
          )}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : saved ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Guardado
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Guardar cambios
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
