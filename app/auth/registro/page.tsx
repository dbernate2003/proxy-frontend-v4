"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ProxyLogo } from "@/components/proxy-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User, Building2, Phone, ArrowLeft, Monitor, Smartphone, Loader2, CheckCircle } from "lucide-react"

export default function RegistroPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("cliente")
  const [acceptTerms, setAcceptTerms] = useState(false)
  
  // Form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    phone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptTerms) return
    
    setIsLoading(true)
    
    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Redirect based on user type
    if (activeTab === "cliente") {
      router.push("/cliente")
    } else {
      router.push("/operador/verificacion")
    }
  }

  const passwordsMatch = formData.password === formData.confirmPassword
  const isValidPassword = formData.password.length >= 8

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/30 bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <ProxyLogo size="default" />
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-semibold">Crear cuenta</CardTitle>
              <CardDescription>
                Unete a la plataforma PROXY
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Tabs for user type */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="cliente" className="text-sm">
                    <Monitor className="w-4 h-4 mr-2" />
                    Cliente
                  </TabsTrigger>
                  <TabsTrigger value="operador" className="text-sm">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Operador
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Juan Perez"
                      className="pl-10 bg-secondary/50 border-border/50"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {activeTab === "cliente" && (
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa (opcional)</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Tu empresa S.A.S"
                        className="pl-10 bg-secondary/50 border-border/50"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}

                {activeTab === "operador" && (
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefono</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+57 300 123 4567"
                        className="pl-10 bg-secondary/50 border-border/50"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electronico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@empresa.com"
                      className="pl-10 bg-secondary/50 border-border/50"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contrasena</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimo 8 caracteres"
                      className="pl-10 pr-10 bg-secondary/50 border-border/50"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="flex items-center gap-2 text-xs">
                      <div className={`w-3 h-3 rounded-full flex items-center justify-center ${isValidPassword ? "bg-emerald-500" : "bg-muted"}`}>
                        {isValidPassword && <CheckCircle className="w-2 h-2 text-white" />}
                      </div>
                      <span className={isValidPassword ? "text-emerald-500" : "text-muted-foreground"}>
                        Minimo 8 caracteres
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar contrasena</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Repite tu contrasena"
                      className="pl-10 bg-secondary/50 border-border/50"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {formData.confirmPassword && (
                    <div className="flex items-center gap-2 text-xs">
                      <div className={`w-3 h-3 rounded-full flex items-center justify-center ${passwordsMatch ? "bg-emerald-500" : "bg-destructive"}`}>
                        {passwordsMatch && <CheckCircle className="w-2 h-2 text-white" />}
                      </div>
                      <span className={passwordsMatch ? "text-emerald-500" : "text-destructive"}>
                        {passwordsMatch ? "Las contrasenas coinciden" : "Las contrasenas no coinciden"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-start space-x-3 pt-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                  />
                  <label htmlFor="terms" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                    Acepto los{" "}
                    <Link href="/terminos" className="text-primary hover:underline">
                      terminos y condiciones
                    </Link>{" "}
                    y la{" "}
                    <Link href="/privacidad" className="text-primary hover:underline">
                      politica de privacidad
                    </Link>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isLoading || !acceptTerms || !passwordsMatch || !isValidPassword}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creando cuenta...
                    </>
                  ) : (
                    "Crear cuenta"
                  )}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                Ya tienes una cuenta?{" "}
                <Link href="/auth/login" className="text-primary hover:underline font-medium">
                  Iniciar sesion
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
