"use client"

import type React from "react"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Metadata } from "next"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    industry: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    currentWebsite: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // In production, this would send to a backend
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-normal text-foreground font-[family-name:var(--font-playfair)] mb-4">
            Thanks
          </h1>
          <p className="text-muted-foreground mb-8">
            I will review your business and reply with next steps.
          </p>
          <Button asChild variant="outline">
            <a href="/">Return Home</a>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <section className="py-24 px-4 lg:px-8 bg-background">
        <div className="container mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-6">Get Started</p>
          <h1 className="text-5xl md:text-6xl font-normal text-foreground font-[family-name:var(--font-playfair)] mb-6">
            Request A Custom Build
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Tell me about your business and I'll get back to you with next steps.
          </p>
        </div>
      </section>

      <section className="py-24 px-4 lg:px-8 bg-secondary">
        <div className="container mx-auto max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Your name"
                  className="bg-background border-border py-6"
                />
              </div>

              <div>
                <label htmlFor="businessName" className="block text-sm font-medium mb-2">
                  Business Name
                </label>
                <Input
                  id="businessName"
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  required
                  placeholder="Your business name"
                  className="bg-background border-border py-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium mb-2">
                Industry
              </label>
              <Input
                id="industry"
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                required
                placeholder="e.g. Junk Removal, Tree Service, Landscaping"
                className="bg-background border-border py-6"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-2">
                  City
                </label>
                <Input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                  placeholder="Your city"
                  className="bg-background border-border py-6"
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium mb-2">
                  State
                </label>
                <Input
                  id="state"
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  required
                  placeholder="Your state"
                  className="bg-background border-border py-6"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  placeholder="Your phone number"
                  className="bg-background border-border py-6"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="your@email.com"
                  className="bg-background border-border py-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="currentWebsite" className="block text-sm font-medium mb-2">
                Current Website <span className="text-muted-foreground">(optional)</span>
              </label>
              <Input
                id="currentWebsite"
                type="url"
                value={formData.currentWebsite}
                onChange={(e) => setFormData({ ...formData, currentWebsite: e.target.value })}
                placeholder="https://yourwebsite.com"
                className="bg-background border-border py-6"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your business and what you're looking for..."
                rows={5}
                className="bg-background border-border"
              />
            </div>

            <Button type="submit" size="lg" className="w-full text-sm py-6 h-auto uppercase tracking-[0.2em]">
              Submit Request
              <ArrowRight className="ml-3 h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>
    </main>
  )
}
