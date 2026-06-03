"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Star, 
  TrendingUp, 
  Award, 
  Clock, 
  CheckCircle,
  MessageSquare,
  ThumbsUp,
  Shield,
  Zap,
  ChevronRight,
  Send
} from "lucide-react"
import { useMockData, type Review } from "@/lib/mock-data"
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-primitives"

const categoryLabels = {
  punctuality: { label: "Puntualidad", icon: Clock },
  quality: { label: "Calidad", icon: CheckCircle },
  communication: { label: "Comunicacion", icon: MessageSquare },
  professionalism: { label: "Profesionalismo", icon: Shield }
}

function StarRating({ rating, size = "default" }: { rating: number; size?: "small" | "default" }) {
  const starSize = size === "small" ? "w-3 h-3" : "w-4 h-4"
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSize} ${star <= rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review, operatorName }: { review: Review; operatorName?: string }) {
  const [showResponse, setShowResponse] = useState(false)
  const [responseText, setResponseText] = useState("")
  
  const date = new Date(review.createdAt)
  const formattedDate = date.toLocaleDateString("es-CO", { 
    day: "numeric", 
    month: "short", 
    year: "numeric" 
  })

  return (
    <Card className="bg-card/50 border-border/50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary/10 text-primary text-sm">
              CL
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-sm">Cliente verificado</span>
              <span className="text-xs text-muted-foreground">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <StarRating rating={review.rating} size="small" />
              <span className="text-xs text-muted-foreground">({review.rating}/5)</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{review.comment}</p>
            
            {/* Category ratings */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {Object.entries(review.categories).map(([key, value]) => {
                const category = categoryLabels[key as keyof typeof categoryLabels]
                return (
                  <div key={key} className="flex items-center gap-2 text-xs">
                    <category.icon className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{category.label}</span>
                    <span className="ml-auto font-medium">{value}/5</span>
                  </div>
                )
              })}
            </div>

            {/* Operator response */}
            {review.operatorResponse ? (
              <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px] h-5">Respuesta</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{review.operatorResponse}</p>
              </div>
            ) : (
              <div>
                {!showResponse ? (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs h-7"
                    onClick={() => setShowResponse(true)}
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Responder
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Escribe tu respuesta..."
                      className="text-sm min-h-[60px] bg-secondary/50"
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" className="h-7 text-xs" disabled={!responseText.trim()}>
                        <Send className="w-3 h-3 mr-1" />
                        Enviar
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => setShowResponse(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ReputacionPage() {
  const { currentOperator, getReviewsByOperator, getOperatorStats } = useMockData()
  
  const operatorId = currentOperator?.id || "op-1"
  const reviews = getReviewsByOperator(operatorId)
  const stats = getOperatorStats(operatorId)

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100 
      : 0
  }))

  return (
    <PageTransition className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <h1 className="text-xl font-bold">Mi Reputacion</h1>
        <p className="text-sm text-muted-foreground">Tu rendimiento y resenas de clientes</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {/* Overall Rating Card */}
        <FadeIn>
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <motion.div 
                    className="text-4xl font-bold text-primary"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {stats.avgRating.toFixed(1)}
                  </motion.div>
                  <StarRating rating={Math.round(stats.avgRating)} />
                  <p className="text-xs text-muted-foreground mt-1">
                    {stats.totalReviews} resenas
                  </p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {ratingDistribution.map((item) => (
                    <div key={item.rating} className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-3">{item.rating}</span>
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <Progress value={item.percentage} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground w-5">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Category Stats */}
        <FadeIn delay={0.1}>
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Estadisticas por categoria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(stats.categories).map(([key, value]) => {
                const category = categoryLabels[key as keyof typeof categoryLabels]
                const percentage = (value / 5) * 100
                return (
                  <div key={key} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <category.icon className="w-4 h-4 text-muted-foreground" />
                        <span>{category.label}</span>
                      </div>
                      <span className="font-medium">{value.toFixed(1)}/5</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </FadeIn>

        {/* Badges & Achievements */}
        <FadeIn delay={0.2}>
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                Insignias obtenidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: Star, label: "Top Rated", color: "amber", unlocked: stats.avgRating >= 4.5 },
                  { icon: Zap, label: "Rapido", color: "primary", unlocked: true },
                  { icon: Shield, label: "Verificado", color: "emerald", unlocked: true },
                  { icon: ThumbsUp, label: "100 Tareas", color: "blue", unlocked: (currentOperator?.completedTasks || 0) >= 100 },
                  { icon: Clock, label: "Puntual", color: "purple", unlocked: stats.categories.punctuality >= 4 },
                  { icon: MessageSquare, label: "Comunicador", color: "pink", unlocked: stats.categories.communication >= 4 }
                ].map((badge, i) => (
                  <motion.div
                    key={badge.label}
                    className={`flex flex-col items-center p-3 rounded-lg border ${
                      badge.unlocked 
                        ? "bg-secondary/50 border-border/50" 
                        : "bg-muted/20 border-muted/30 opacity-50"
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: badge.unlocked ? 1 : 0.5, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <badge.icon className={`w-6 h-6 mb-1 ${
                      badge.unlocked ? `text-${badge.color}-500` : "text-muted-foreground"
                    }`} />
                    <span className="text-[10px] text-center">{badge.label}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Reviews List */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Resenas recientes
            </h2>
            <span className="text-xs text-muted-foreground">{reviews.length} total</span>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full grid grid-cols-3 h-8 mb-3">
              <TabsTrigger value="all" className="text-xs">Todas</TabsTrigger>
              <TabsTrigger value="positive" className="text-xs">Positivas</TabsTrigger>
              <TabsTrigger value="pending" className="text-xs">Sin responder</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3 mt-0">
              <StaggerContainer staggerDelay={0.05}>
                {reviews.map((review) => (
                  <StaggerItem key={review.id}>
                    <ReviewCard review={review} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TabsContent>

            <TabsContent value="positive" className="space-y-3 mt-0">
              <StaggerContainer staggerDelay={0.05}>
                {reviews.filter(r => r.rating >= 4).map((review) => (
                  <StaggerItem key={review.id}>
                    <ReviewCard review={review} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TabsContent>

            <TabsContent value="pending" className="space-y-3 mt-0">
              {reviews.filter(r => !r.operatorResponse).length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Todas las resenas han sido respondidas</p>
                </div>
              ) : (
                <StaggerContainer staggerDelay={0.05}>
                  {reviews.filter(r => !r.operatorResponse).map((review) => (
                    <StaggerItem key={review.id}>
                      <ReviewCard review={review} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  )
}
