import { MapPin, Phone } from "lucide-react"

const PHONE = "(407) 801-7886"
const PHONE_HREF = "tel:4078017886"

const areas = [
  "Orlando", "Winter Park", "Lake Nona", "Ocoee",
  "Maitland", "Kissimmee", "Sanford", "Apopka",
  "Altamonte Springs", "Longwood", "Casselberry", "St. Cloud",
  "Clermont", "Windermere", "Doctor Phillips", "Celebration",
]

export function ServiceArea() {
  return (
    <section id="service-area" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <p className="text-xs font-black text-accent uppercase tracking-[0.2em] mb-4">100% Service Coverage</p>
            <h2 className="text-5xl md:text-[3.5rem] font-black tracking-tight text-foreground leading-[1.0] mb-5 text-balance">
              Everywhere in Central Florida
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-2">
              Same-day service across Orlando and all surrounding areas.
            </p>
            <p className="text-sm text-muted-foreground mb-10">
              Whether you're downtown or 30 minutes out, we're ready when you need us.
            </p>

            {/* Area chips */}
            <div className="flex flex-wrap gap-2 mb-10">
              {areas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-1.5 bg-card border border-border rounded-lg px-3.5 py-2 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                >
                  <MapPin className="h-3 w-3 text-primary shrink-0" />
                  <span className="text-sm font-semibold text-foreground">{area}</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Don't see your city? Call us — we likely still cover you.
            </p>

            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-3 bg-foreground text-background font-black px-7 py-4 rounded-xl hover:bg-foreground/90 transition-colors text-sm"
            >
              <Phone className="h-4 w-4" />
              Call {PHONE}
            </a>
          </div>

          {/* Right: map */}
          <div className="relative rounded-2xl overflow-hidden aspect-square border border-border shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224162.78390272783!2d-81.46810580694499!3d28.483055831490537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e773d8fecdbc77%3A0xac3b2063ca5bf9e!2sOrlando%2C%20FL!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(25%) contrast(105%) saturate(85%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Orlando Junk Removal Service Area — Central Florida"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
