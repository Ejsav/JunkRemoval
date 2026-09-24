/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/contact", destination: "/quote", permanent: true },
      { source: "/get-more-jobs", destination: "/demo", permanent: true },
      { source: "/what-you-get", destination: "/demo", permanent: true },
      { source: "/disclaimer", destination: "/demo", permanent: true },
      { source: "/how-it-works", destination: "/#how-it-works", permanent: true },
      { source: "/industries", destination: "/services", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:slug*", destination: "/", permanent: true },
    ]
  },
}

export default nextConfig
