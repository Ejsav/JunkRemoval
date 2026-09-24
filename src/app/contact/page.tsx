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

  /*
   * RECONSTRUCTION NOTE: the Vercel deployment-file-contents API truncated this
   * file's source at ~8,152 base64 characters (~6.1KB) short of the full file,
   * right at the start of the form JSX. The actual field layout/copy/styling
   * below is a minimal, mechanically-generated placeholder built only from the
   * `formData` shape already declared above (name, businessName, industry,
   * city, state, phone, email, currentWebsite, message) and does not reproduce
   * the original page's real layout, field grouping, or copy.
   */
  return (
    <main className="min-h-screen">
      <section className="py-24 px-4 lg:px-8 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-8">
            Tell me about your business
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              placeholder="Business name"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              required
            />
            <Input
              placeholder="Industry"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
              <Input
                placeholder="State"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              />
            </div>
            <Input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <Input
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              placeholder="Current website (if any)"
              value={formData.currentWebsite}
              onChange={(e) => setFormData({ ...formData, currentWebsite: e.target.value })}
            />
            <Textarea
              placeholder="Tell me more"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <Button type="submit" size="lg">
              Submit <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>
    </main>
  )
}
