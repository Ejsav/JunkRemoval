import {
  Armchair, Building2, Calendar, Clock, DollarSign, Hand, HardHat, Home, Leaf,
  Package, Recycle, Refrigerator, Shield, Sparkles, Truck, Warehouse,
  type LucideIcon,
} from "lucide-react"
import type { IconName } from "@/config/site"

export const icons: Record<IconName, LucideIcon> = {
  home: Home,
  building: Building2,
  garage: Warehouse,
  sofa: Armchair,
  fridge: Refrigerator,
  leaf: Leaf,
  estate: Package,
  hardhat: HardHat,
  truck: Truck,
  recycle: Recycle,
  shield: Shield,
  clock: Clock,
  dollar: DollarSign,
  sparkles: Sparkles,
  hand: Hand,
  calendar: Calendar,
}
