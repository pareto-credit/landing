import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  BarChart2,
  CheckCircle2,
  Code,
  Droplets,
  Layout,
  Lock,
  Palette,
  PieChart,
  ShieldCheck,
} from 'lucide-react'

export interface SolutionFeature {
  name: string
  icon: LucideIcon
  desc: string
}

export const wlFeatures: SolutionFeature[] = [
  {
    name: 'Full branding control',
    icon: Palette,
    desc: 'Customize the entire user interface, from colors to typography, ensuring a seamless brand experience for your institutional clients.',
  },
  {
    name: 'Curated liquidity',
    icon: Droplets,
    desc: 'Access exclusive, permissioned liquidity pools tailored to your specific risk appetite and capital requirements.',
  },
  {
    name: 'Compliance tooling',
    icon: ShieldCheck,
    desc: 'Automate KYC/AML checks and ensure full regulatory compliance across jurisdictions without manual intervention.',
  },
  {
    name: 'Integrated reporting',
    icon: BarChart2,
    desc: 'Generate real-time, audit-ready reports covering portfolio performance, risk metrics, and capital flows.',
  },
  {
    name: 'SLA guarantees',
    icon: CheckCircle2,
    desc: 'Rely on enterprise-grade uptime and dedicated support, ensuring your credit facility operates flawlessly 24/7.',
  },
]

export const studioFeatures: SolutionFeature[] = [
  {
    name: 'Vault configuration & deployment',
    icon: Layout,
    desc: 'Design credit structures visually, simulate key parameters, and transition from draft setup to mainnet deployment through a guided workflow.',
  },
  {
    name: 'Real-time risk modeling',
    icon: Activity,
    desc: 'Visualize potential market stress scenarios and adjust parameters dynamically before deploying capital.',
  },
  {
    name: 'Automated cap tables',
    icon: PieChart,
    desc: 'Maintain transparent, immutable records of all stakeholders, debt issuances, and capital distributions.',
  },
  {
    name: 'Smart contract orchestration',
    icon: Lock,
    desc: 'Coordinate complex multi-contract interactions safely through our audited deployment pipeline.',
  },
  {
    name: 'API-first architecture',
    icon: Code,
    desc: 'Integrate your existing backend systems effortlessly with our comprehensive REST and WebSocket APIs.',
  },
]
