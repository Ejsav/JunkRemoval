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
      const response = await fetch("https://formspree.io/f/xojkkydk", {
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
        <div className="px-8 py-20 lg:px-16 lg:py-24 flex flex-col justify-center bg-foreground">
          <p className="text-xs font-black uppercase tracking-[0.2em] mb-3 text-accent">Get Your</p>
          {/*
            RECONSTRUCTION NOTE: the Vercel deployment-file-contents API
            truncated this file's source at ~9,604 base64 characters
            (~7.2KB) short of the full file, right here (mid "Get Your ...").
            The rest of the left info panel (headline, trust points using the
            Clock/Shield/CheckCircle icons imported above) and the entire
            right-hand quote-request form (which would use the `formData`
            fields already declared above: name, phone, email, service,
            cityZip, message, submitted via Select/Input/Textarea/Label) were
            cut off and could not be retrieved. No photo/file-upload input was
            present in the portion of the source that WAS retrieved.
          */}
        </div>
      </div>
    </section>
  )
}
