"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ProxyLogo } from "@/components/proxy-logo"
import { LiveSimulation } from "@/components/live-simulation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, Monitor, Shield, Zap, Users, CheckCircle, ArrowRight, Play, Settings } from "lucide-react"
import { useState } from "react"

const features = [
  {
    icon: Shield,
    title: "Operadores Verificados",
    description: "Verificacion biometrica y documental de todos los operadores.",
  },
  {
    icon: Zap,
    title: "Coordinacion IA",
    description: "Agentes de IA optimizan asignacion y guian operadores.",
  },
  {
    icon: Users,
    title: "Cobertura Nacional",
    description: "Red de operadores en principales ciudades 24/7.",
  },
  {
    icon: CheckCircle,
    title: "Evidencia Digital",
    description: "Fotos, videos y firmas como prueba de cada tarea.",
  },
]

const stats = [
  { value: "1,247+", label: "Operadores" },
  { value: "98.5%", label: "Tasa de exito" },
  { value: "15K+", label: "Tareas" },
  { value: "32 min", label: "Promedio" },
]

export default function LandingPage() {
  const [showSimulation, setShowSimulation] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30 sticky top-0 z-50 bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <ProxyLogo size="default" />
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#demo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Demo
            </Link>
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Caracteristicas
            </Link>
            <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Admin
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth/login">Iniciar sesion</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/operador/auth/registro">Ser Operador</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Zap className="w-3 h-3" />
            Plataforma de operadores verificados
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-5 text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Presencia humana,
            <br />
            <span className="text-primary">cuando la necesitas.</span>
          </motion.h1>
          
          <motion.p 
            className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Conectamos agentes de IA con operadores humanos verificados para ejecutar tareas fisicas. Entregas, verificaciones, inspecciones.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button size="lg" asChild>
              <Link href="/cliente">
                <Monitor className="w-4 h-4 mr-2" />
                Panel de Clientes
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/operador">
                <Smartphone className="w-4 h-4 mr-2" />
                App de Operadores
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label} 
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="text-2xl md:text-3xl font-semibold text-primary">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">Mira la IA en accion</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Observa como PROXY coordina operadores en tiempo real.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {showSimulation ? (
              <LiveSimulation className="h-[450px] rounded-lg border border-border/50" speed="normal" />
            ) : (
              <motion.div 
                className="h-[450px] rounded-lg bg-secondary/30 border border-border/30 flex items-center justify-center cursor-pointer"
                onClick={() => setShowSimulation(true)}
                whileHover={{ borderColor: "oklch(0.72 0.12 195 / 0.3)" }}
              >
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Play className="w-6 h-6 text-primary ml-0.5" />
                  </div>
                  <p className="text-sm font-medium">Iniciar simulacion</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Clic para ver la plataforma</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-20 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">Todo lo que necesitas</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Plataforma completa para gestionar tareas fisicas con operadores verificados.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/30 border-border/30 h-full">
                  <CardHeader className="pb-2">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <feature.icon className="w-4 h-4 text-primary" />
                    </div>
                    <CardTitle className="text-sm font-medium">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-xs">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Selection */}
      <section className="py-16 md:py-20 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">Elige tu plataforma</h2>
            <p className="text-sm text-muted-foreground">Dos productos para diferentes necesidades.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Card className="bg-card/30 border-border/30 hover:border-primary/30 transition-colors">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Smartphone className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-base">App de Operadores</CardTitle>
                <CardDescription className="text-xs">
                  Gana dinero ejecutando tareas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {["Verificacion de identidad", "Mapa de tareas", "Billetera digital", "Certificaciones"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" size="sm" asChild>
                  <Link href="/operador">
                    Explorar App
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-card/30 border-border/30 hover:border-primary/30 transition-colors">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Monitor className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-base">Panel de Clientes</CardTitle>
                <CardDescription className="text-xs">
                  Ordena y gestiona tareas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {["Dashboard con metricas", "Crear tareas", "Seguimiento en vivo", "Reportes"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" size="sm" asChild>
                  <Link href="/cliente">
                    Explorar Panel
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <ProxyLogo size="small" />
            <p className="text-xs text-muted-foreground">
              2024 PROXY. Bogota, Colombia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
