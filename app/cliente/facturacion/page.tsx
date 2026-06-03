"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { 
  CreditCard, 
  Plus, 
  Download, 
  Receipt,
  TrendingUp,
  FileText,
  Check,
  X,
  Zap,
  Building2,
  Users,
  Loader2,
  CheckCircle,
  Sparkles,
  Shield,
  Headphones,
  Clock
} from "lucide-react"
import { FadeIn, PageTransition, AnimatedCounter } from "@/components/motion-primitives"
import { cn } from "@/lib/utils"

const creditPackages = [
  { id: "50k", amount: 50000, bonus: 0, label: "$50,000" },
  { id: "100k", amount: 100000, bonus: 5000, label: "$100,000", popular: false },
  { id: "250k", amount: 250000, bonus: 25000, label: "$250,000", popular: true },
  { id: "500k", amount: 500000, bonus: 75000, label: "$500,000" },
  { id: "1m", amount: 1000000, bonus: 200000, label: "$1,000,000" },
]

const paymentMethods = [
  { id: "pse", name: "PSE", description: "Transferencia bancaria" },
  { id: "card", name: "Tarjeta", description: "Credito o debito" },
  { id: "nequi", name: "Nequi", description: "Desde tu app Nequi" },
  { id: "daviplata", name: "Daviplata", description: "Desde tu app Daviplata" },
]

const plans = [
  {
    id: "basico",
    name: "Basico",
    price: 0,
    priceLabel: "Gratis",
    description: "Para empezar a usar PROXY",
    features: [
      { text: "Hasta 10 tareas/mes", included: true },
      { text: "Operadores verificados", included: true },
      { text: "Evidencia digital", included: true },
      { text: "Soporte por email", included: true },
      { text: "Acceso a API", included: false },
      { text: "Dashboard de reportes", included: false },
      { text: "Soporte prioritario", included: false },
      { text: "Operadores dedicados", included: false },
    ],
    icon: Users,
    color: "text-muted-foreground",
    bgColor: "bg-muted/50"
  },
  {
    id: "profesional",
    name: "Profesional",
    price: 199000,
    priceLabel: "$199,000",
    description: "Para negocios en crecimiento",
    features: [
      { text: "Tareas ilimitadas", included: true },
      { text: "Operadores verificados", included: true },
      { text: "Evidencia digital", included: true },
      { text: "Soporte por email", included: true },
      { text: "Acceso a API", included: true },
      { text: "Dashboard de reportes", included: true },
      { text: "Soporte prioritario", included: false },
      { text: "Operadores dedicados", included: false },
    ],
    icon: Zap,
    color: "text-primary",
    bgColor: "bg-primary/10",
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 499000,
    priceLabel: "$499,000",
    description: "Para grandes operaciones",
    features: [
      { text: "Tareas ilimitadas", included: true },
      { text: "Operadores verificados", included: true },
      { text: "Evidencia digital", included: true },
      { text: "Soporte por email", included: true },
      { text: "Acceso a API", included: true },
      { text: "Dashboard de reportes", included: true },
      { text: "Soporte prioritario 24/7", included: true },
      { text: "Operadores dedicados", included: true },
    ],
    icon: Building2,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10"
  }
]

const invoices = [
  {
    id: "INV-2024-001",
    date: "Jun 30, 2024",
    amount: 1250000,
    tasksCount: 45,
    status: "paid",
  },
  {
    id: "INV-2024-002",
    date: "May 31, 2024",
    amount: 980000,
    tasksCount: 38,
    status: "paid",
  },
  {
    id: "INV-2024-003",
    date: "Abr 30, 2024",
    amount: 1100000,
    tasksCount: 42,
    status: "paid",
  },
  {
    id: "INV-2024-004",
    date: "Mar 31, 2024",
    amount: 850000,
    tasksCount: 32,
    status: "paid",
  },
  {
    id: "INV-2024-005",
    date: "Feb 29, 2024",
    amount: 720000,
    tasksCount: 28,
    status: "paid",
  },
]

export default function FacturacionPage() {
  const [currentBalance, setCurrentBalance] = useState(2450000)
  const [currentPlan, setCurrentPlan] = useState("enterprise")
  const [showAddCredits, setShowAddCredits] = useState(false)
  const [showPlans, setShowPlans] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState("250k")
  const [selectedPayment, setSelectedPayment] = useState("pse")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const usedThisMonth = 850000
  const tasksThisMonth = 32

  const handleAddCredits = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    
    const pkg = creditPackages.find(p => p.id === selectedPackage)
    if (pkg) {
      setCurrentBalance(prev => prev + pkg.amount + pkg.bonus)
    }
    
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setShowAddCredits(false)
    }, 2000)
  }

  const selectedPkg = creditPackages.find(p => p.id === selectedPackage)

  return (
    <PageTransition className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Facturacion</h1>
          <p className="text-muted-foreground">Gestiona tus creditos, plan y facturas</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowPlans(true)}>
            <Sparkles className="w-4 h-4 mr-2" />
            Ver planes
          </Button>
          <Button onClick={() => setShowAddCredits(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Agregar creditos
          </Button>
        </div>
      </div>

      {/* Balance and stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Current balance */}
        <FadeIn>
          <Card className="bg-primary/10 border-primary/20 sm:col-span-2 lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Saldo disponible</p>
                  <p className="text-4xl font-bold text-primary mt-2">
                    $<AnimatedCounter value={currentBalance} duration={1} />
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">COP</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
              </div>
              <Button className="w-full mt-4" onClick={() => setShowAddCredits(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Recargar saldo
              </Button>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Used this month */}
        <FadeIn delay={0.1}>
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Consumo este mes</p>
                  <p className="text-2xl font-bold mt-2">
                    ${usedThisMonth.toLocaleString("es-CO")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    +15% vs mes anterior
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Tasks this month */}
        <FadeIn delay={0.2}>
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tareas este mes</p>
                  <p className="text-2xl font-bold mt-2">{tasksThisMonth}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Promedio: $26,562 COP/tarea
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      {/* Current plan */}
      <FadeIn delay={0.3}>
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Plan actual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  plans.find(p => p.id === currentPlan)?.bgColor
                )}>
                  {(() => {
                    const plan = plans.find(p => p.id === currentPlan)
                    const Icon = plan?.icon || Zap
                    return <Icon className={cn("w-6 h-6", plan?.color)} />
                  })()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{plans.find(p => p.id === currentPlan)?.name}</h3>
                    <StatusBadge status="active">Activo</StatusBadge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plans.find(p => p.id === currentPlan)?.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    {plans.find(p => p.id === currentPlan)?.priceLabel}
                  </p>
                  <p className="text-sm text-muted-foreground">COP / mes</p>
                </div>
                <Button variant="outline" onClick={() => setShowPlans(true)}>
                  Cambiar plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Invoices table */}
      <FadeIn delay={0.4}>
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Historial de facturas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Factura</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tareas</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-mono text-sm">{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.tasksCount} tareas</TableCell>
                    <TableCell className="font-medium">
                      ${invoice.amount.toLocaleString("es-CO")} COP
                    </TableCell>
                    <TableCell>
                      <StatusBadge status="completed">Pagada</StatusBadge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Add Credits Dialog */}
      <Dialog open={showAddCredits} onOpenChange={setShowAddCredits}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Agregar creditos</DialogTitle>
            <DialogDescription>
              Selecciona el monto y metodo de pago para recargar tu saldo
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="py-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-lg font-semibold">Pago exitoso</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Se han agregado ${((selectedPkg?.amount || 0) + (selectedPkg?.bonus || 0)).toLocaleString("es-CO")} COP a tu cuenta
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Amount selection */}
                <div className="space-y-3">
                  <Label>Selecciona el monto</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {creditPackages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className={cn(
                          "relative p-3 rounded-lg border-2 cursor-pointer transition-all text-center",
                          selectedPackage === pkg.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        )}
                        onClick={() => setSelectedPackage(pkg.id)}
                      >
                        {pkg.popular && (
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                            <Badge variant="default" className="text-[10px] px-2 py-0">
                              Popular
                            </Badge>
                          </div>
                        )}
                        <p className="font-semibold text-sm">{pkg.label}</p>
                        {pkg.bonus > 0 && (
                          <p className="text-[10px] text-emerald-400 mt-1">
                            +${pkg.bonus.toLocaleString("es-CO")} bonus
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment method */}
                <div className="space-y-3">
                  <Label>Metodo de pago</Label>
                  <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                    <div className="grid grid-cols-2 gap-2">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all",
                            selectedPayment === method.id
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          )}
                          onClick={() => setSelectedPayment(method.id)}
                        >
                          <RadioGroupItem value={method.id} id={method.id} />
                          <div>
                            <p className="text-sm font-medium">{method.name}</p>
                            <p className="text-[10px] text-muted-foreground">{method.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Summary */}
                {selectedPkg && (
                  <Card className="bg-secondary/50 border-0">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Monto seleccionado</span>
                        <span>${selectedPkg.amount.toLocaleString("es-CO")}</span>
                      </div>
                      {selectedPkg.bonus > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Bonus</span>
                          <span className="text-emerald-400">+${selectedPkg.bonus.toLocaleString("es-CO")}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 border-t border-border">
                        <span className="font-semibold">Total a recibir</span>
                        <span className="font-bold text-primary">
                          ${(selectedPkg.amount + selectedPkg.bonus).toLocaleString("es-CO")} COP
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!showSuccess && (
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddCredits(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddCredits} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pagar ${selectedPkg?.amount.toLocaleString("es-CO")}
                  </>
                )}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      {/* Plans Dialog */}
      <Dialog open={showPlans} onOpenChange={setShowPlans}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Planes disponibles</DialogTitle>
            <DialogDescription>
              Elige el plan que mejor se adapte a tus necesidades
            </DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-3 gap-4 py-4">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "relative rounded-xl border-2 p-5 transition-all",
                  currentPlan === plan.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary">Mas popular</Badge>
                  </div>
                )}

                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-4", plan.bgColor)}>
                  <plan.icon className={cn("w-5 h-5", plan.color)} />
                </div>

                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.priceLabel}</span>
                  {plan.price > 0 && (
                    <span className="text-sm text-muted-foreground"> /mes</span>
                  )}
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      {feature.included ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className={feature.included ? "" : "text-muted-foreground"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={currentPlan === plan.id ? "outline" : "default"}
                  disabled={currentPlan === plan.id}
                >
                  {currentPlan === plan.id ? "Plan actual" : "Seleccionar"}
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 border-t border-border text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Pago seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-primary" />
              <span>Soporte incluido</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Cancela cuando quieras</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageTransition>
  )
}
