"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDevice } from "@/contexts/DeviceProvider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Star, TrendingUp } from "lucide-react"
import { trackTestimonialInteraction } from "@/lib/analytics"

interface Testimonial {
  id: number
  quote: string
  author: string
  role: string
  company: string
  metric: string
  avatar: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "We cut our strategic planning time from 2 weeks to 3 hours. The AI agents surface insights we'd never considered.",
    author: "Sarah Chen",
    role: "VP Product",
    company: "TechCorp",
    metric: "87% faster decisions",
    avatar: "/professional-woman-diverse.png",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "AnyDebate AI transformed how our team approaches complex problems. We're making better decisions with more confidence.",
    author: "Marcus Rodriguez",
    role: "CEO",
    company: "InnovateLabs",
    metric: "3x more perspectives",
    avatar: "/professional-man.jpg",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "The multi-agent collaboration is a game-changer. We uncover blind spots in minutes that used to take weeks of meetings.",
    author: "Emily Watson",
    role: "Head of Strategy",
    company: "GrowthCo",
    metric: "60% time saved",
    avatar: "/professional-woman-2.png",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "Finally, a tool that helps us think through decisions systematically. The AI agents challenge our assumptions in the best way.",
    author: "David Kim",
    role: "CTO",
    company: "DataFlow",
    metric: "95% accuracy boost",
    avatar: "/professional-man-2.png",
    rating: 5,
  },
]

export function TestimonialCarousel() {
  const { isMobile } = useDevice()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  useEffect(() => {
    trackTestimonialInteraction("view", testimonials[currentIndex].id)
  }, [currentIndex])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
    setCurrentIndex(newIndex)
    trackTestimonialInteraction("navigate", testimonials[newIndex].id)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    const newIndex = (currentIndex + 1) % testimonials.length
    setCurrentIndex(newIndex)
    trackTestimonialInteraction("navigate", testimonials[newIndex].id)
  }

  const testimonial = testimonials[currentIndex]

  return (
    <div className="relative">
      <Card
        className={`
          bg-card/50 border-border/50 overflow-hidden
          ${isMobile ? "p-6" : "p-8 md:p-10"}
        `}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Rating */}
            <div className="flex items-center gap-1">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className={`${isMobile ? "text-base" : "text-lg md:text-xl"} leading-relaxed text-pretty`}>
              "{testimonial.quote}"
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Avatar className={isMobile ? "h-12 w-12" : "h-14 w-14"}>
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                  <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className={`font-semibold ${isMobile ? "text-sm" : "text-base"}`}>{testimonial.author}</p>
                  <p className={`text-muted-foreground ${isMobile ? "text-xs" : "text-sm"}`}>
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Metric Badge */}
              <Badge variant="secondary" className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {testimonial.metric}
              </Badge>
            </div>
          </motion.div>
        </AnimatePresence>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          size="sm"
          variant="outline"
          onClick={handlePrevious}
          className="min-h-[44px] min-w-[44px] bg-transparent"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false)
                setCurrentIndex(index)
              }}
              className={`
                h-2 rounded-full transition-all
                ${index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"}
              `}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={handleNext}
          className="min-h-[44px] min-w-[44px] bg-transparent"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
