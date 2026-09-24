const projects = [
  {
    title: "Garage Cleanout",
    time: "2 hours",
    image: "/clean-empty-garage-after-junk-removal.jpg",
  },
  {
    title: "Estate Cleanout",
    time: "1 day",
    image: "/empty-house-room-after-estate-cleanout.jpg",
  },
  {
    title: "Office Removal",
    time: "4 hours",
    image: "/empty-office-space-after-furniture-removal.jpg",
  },
]

export function BeforeAfterGallery() {
  return (
    <section className="py-24 px-4 lg:px-8 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-[family-name:var(--font-playfair)]">
            Recent Projects
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <div key={index} className="group relative aspect-[4/3] overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={`${project.title} - completed junk removal project`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-foreground font-[family-name:var(--font-playfair)]">
                  {project.title}
                </h3>
                <p className="text-sm text-primary uppercase tracking-wider">Completed in {project.time}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-center text-muted-foreground mt-12 uppercase tracking-wider">
          Example images for demonstration
        </p>
      </div>
    </section>
  )
}
