import type { SolutionFeature } from '../../../data/solutions'

interface FeatureListProps {
  features: SolutionFeature[]
  activeIndex: number
  onHover: (index: number) => void
}

const FeatureList = ({ features, activeIndex, onHover }: FeatureListProps) => {
  return (
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li
          key={feature.name}
          onMouseEnter={() => onHover(index)}
          className={`flex cursor-pointer items-center gap-4 rounded-xl p-4 transition-all duration-300 ${
            activeIndex === index
              ? 'border border-white/10 bg-white/[0.05] shadow-lg'
              : 'border border-transparent hover:bg-white/[0.02]'
          }`}
        >
          <feature.icon className={activeIndex === index ? 'text-[#70B19E]' : 'text-gray-500'} size={24} />
          <span className={`text-lg font-semibold ${activeIndex === index ? 'text-white' : 'text-gray-400'}`}>
            {feature.name}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default FeatureList
