"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ProxyLogo } from "@/components/proxy-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ArrowLeft, Loader2, CheckCircle, ArrowRight } from "lucide-react"

export default function RecuperarPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate sending email
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setEmailSent(true)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/30 bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <ProxyLogo size="default" />
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/login">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al login
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              {!emailSent ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-semibold">Recuperar contrasena</CardTitle>
                    <CardDescription>
                      Te enviaremos un enlace para restablecer tu contrasena
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electronico</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="tu@empresa.com"
                            className="pl-10 bg-secondary/50 border-border/50"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        size="lg"
                        disabled={isLoading || !email}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          "Enviar enlace de recuperacion"
                        )}
                      </Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground">
                      Recuerdas tu contrasena?{" "}
                      <Link href="/auth/login" className="text-primary hover:underline font-medium">
                        Iniciar sesion
                      </Link>
                    </p>
                  </CardContent>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CardHeader className="text-center pb-4">
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </motion.div>
                    <CardTitle className="text-2xl font-semibold">Revisa tu correo</CardTitle>
                    <CardDescription>
                      Hemos enviado un enlace de recuperacion a <strong className="text-foreground">{email}</strong>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-secondary/30 rounded-lg p-4 text-sm text-muted-foreground space-y-2">
                      <p>El enlace expira en <strong className="text-foreground">1 hora</strong>.</p>
                      <p>Si no recibes el correo, revisa tu carpeta de spam.</p>
                    </div>

                    <div className="space-y-3">
                      <Button 
                        variant="outline"
                        className="w-full" 
                        onClick={() => setEmailSent(false)}
                      >
                        Enviar a otro correo
                      </Button>
                      
                      <Button asChild className="w-full">
                        <Link href="/auth/login">
                          Volver al login
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>

                    <p className="text-center text-xs text-muted-foreground">
                      Necesitas ayuda?{" "}
                      <Link href="/soporte" className="text-primary hover:underline">
                        Contactar soporte
                      </Link>
                    </p>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
