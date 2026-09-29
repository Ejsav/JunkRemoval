import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

const config = [
  ...nextVitals,
  ...nextTs,
  // components/ui is the unmodified shadcn kit.
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts", "components/ui/**", "hooks/**"] },
]

export default config
