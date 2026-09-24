"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Clock, Shield, ArrowRight, CheckCircle } from "lucide-react"

const PHONE = "(407) 801-7886"
const PHONE_HREF = "tel:4078017886"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    cityZip: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("https://formspree.io/f/xojkykdk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  return (
    <section id="quote" className="py-0 bg-background">
      <div className="grid lg:grid-cols-2">

        {/* Left — dark info panel */}
        <div className="px-6 sm:px-8 py-16 lg:px-16 lg:py-24 flex flex-col justify-center bg-foreground">
          <p className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-accent">Get Booked Today</p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-black tracking-tight text-background leading-[1.1] mb-4 text-balance">
            Lock your price now.
          </h2>
          <p className="text-accent font-black text-sm sm:text-base mb-8">Call for fastest booking. Form works 24/7.</p>
          <p className="text-background/60 leading-snug mb-10 text-sm max-w-sm font-medium">
            Get instant callback. Confirm job details. Crew arrives same-day.
          </p>

          {/* Phone CTA */}
          <a
            href={PHONE_HREF}
            className="flex items-center gap-4 rounded-xl p-5 sm:p-6 mb-8 border border-background/15 bg-background/10 hover:bg-background/20 hover:border-background/30 hover:shadow-lg transition-all group font-bold text-background btn-lift"
          >
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform bg-chart-4 shadow-md shadow-chart-4/30">
              <Phone className="h-5 w-5 text-background" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-background/70 uppercase tracking-wide">Call to Book</p>
              <p className="text-lg sm:text-xl font-black text-background">{PHONE}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-background/50 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Assurances */}
          <div className="flex flex-col gap-3">
            {[
              { icon: Clock,   text: "Response in 60 minutes" },
              { icon: Shield,  text: "No obligation" },
              { icon: Phone,   text: "7am–8pm, 7 days a week" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <Icon className="h-4 w-4 shrink-0 text-card" />
                <p className="text-xs font-medium text-background/60">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="bg-card px-6 sm:px-8 py-16 lg:px-16 lg:py-24 flex items-center border-t lg:border-t-0 lg:border-l border-border">
          <div className="w-full max-w-lg">
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-2 ring-success/20">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-2">Got it!</h3>
                <p className="text-muted-foreground text-sm leading-snug">
                  We'll be in touch shortly. For faster response, call <a href={PHONE_HREF} className="font-black text-primary hover:underline">{PHONE}</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="mb-2">
                  <h3 className="text-xl sm:text-2xl font-black text-foreground">Tell us about the job</h3>
                  <p className="text-xs text-muted-foreground mt-1.5 font-medium">2 minutes to submit.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="font-black text-foreground text-xs uppercase tracking-wide">Full Name *</Label>
                    <Input id="name" type="text" required placeholder="John Smith" value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-12 rounded-lg text-sm focus-ring" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone" className="font-black text-foreground text-xs uppercase tracking-wide">Phone *</Label>
                    <Input id="phone" type="tel" required placeholder="(407) 801-7886" value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="h-12 rounded-lg text-sm focus-ring" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="font-black text-foreground text-xs uppercase tracking-wide">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-12 rounded-lg text-sm focus-ring" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label className="font-black text-foreground text-xs uppercase tracking-wide">Service</Label>
                    <Select onValueChange={(v) => setFormData({ ...formData, service: v })}>
                      <SelectTrigger className="h-12 rounded-lg text-sm focus-ring">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="garage">Garage Cleanout</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="appliance">Appliance</SelectItem>
                        <SelectItem value="estate">Estate Cleanout</SelectItem>
                        <SelectItem value="construction">Construction Debris</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="cityZip" className="font-black text-foreground text-xs uppercase tracking-wide">City / Zip</Label>
                    <Input id="cityZip" type="text" placeholder="Orlando / 32801" value={formData.cityZip}
                      onChange={(e) => setFormData({ ...formData, cityZip: e.target.value })} className="h-12 rounded-lg text-sm focus-ring" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="message" className="font-black text-foreground text-xs uppercase tracking-wide">Job Details</Label>
                  <Textarea id="message" rows={3} placeholder="What needs to go? Any access notes..."
                    value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="rounded-lg resize-none text-sm focus-ring p-4" />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-black text-base h-14 rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/85 hover:-translate-y-0.5 active:scale-[0.97] transition-all mt-4 btn-lift uppercase tracking-wide"
                >
                  Get Your Free Quote
                  <ArrowRight className="h-5 w-5" />
                </button>
                <p className="text-xs text-center text-muted-foreground leading-snug">
                  Your information is used only to schedule and quote your job — never shared or sold.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
