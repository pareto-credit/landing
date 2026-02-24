export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

export const testimonialList: Testimonial[] = [
  {
    quote:
      "The Pareto team has done a great job working with us […] We’ve reduced it (loan management process) down to a few simple steps, that are incredibly secure.",
    name: 'Bob Rutherford',
    role: 'VP of Operations',
    company: 'FalconX',
  },
  {
    quote: 'It took us less than 15 minutes to go from zero to a fully executed investment.',
    name: 'Adam Bilko',
    role: 'Portfolio Manager',
    company: 'RockawayX',
  },
  {
    quote:
      'Pareto’s framework allowed us to structure institutional credit with the discipline of traditional finance.',
    name: 'Peter Salyga',
    role: 'Director',
    company: 'M11 Credit',
  },
  {
    quote:
      "Pareto's implementation made integrating with their FalconX Credit Vault simple, allowing us to smoothly build out a novel strategy around it with confidence.",
    name: 'Carson Brown',
    role: 'Senior Product Manager',
    company: 'Gauntlet',
  },
  {
    quote:
      'We see programmable credit as the natural evolution of trading infrastructure. With Pareto, we can scale liquidity at the same speed we execute, creating a direct bridge between high-frequency markets and onchain credit.',
    name: 'Han Chang',
    role: 'Co-Founder',
    company: 'Adaptive Frontier',
  },
  {
    quote:
      'Bridging the gap between centralized and decentralized finance has always been a core part of our mission and the Pareto team has helped us bring that vision to live.',
    name: 'Craig Birchall',
    role: 'Head of Credit (Americas)',
    company: 'FalconX',
  },
]
