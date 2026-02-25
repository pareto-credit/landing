import type { SolutionFeature } from '../../../data/solutions'
import { cn } from '../../../lib/cn'

interface FeatureListProps {
  features: SolutionFeature[]
  activeIndex: number
  onHover: (index: number) => void
}

interface FeatureListItemProps {
  feature: SolutionFeature
  isActive: boolean
  onHover: () => void
}

const FeatureListItem = ({ feature, isActive, onHover }: FeatureListItemProps) => (
  <li
    onMouseEnter={onHover}
    className={cn(
      'flex cursor-pointer items-center gap-4 rounded-xl p-4 transition-all duration-300',
      isActive
        ? 'border border-[var(--color-border-inverse-soft)] bg-[var(--color-overlay-surface-05)] shadow-lg'
        : 'border border-transparent hover:bg-[var(--color-overlay-surface-02)]',
    )}
  >
    <feature.icon className={isActive ? 'text-[var(--color-brand-alt)]' : 'text-[var(--color-text-muted-soft)]'} size={24} />
    <span className={cn('text-lg font-semibold', isActive ? 'text-[var(--color-text-inverse)]' : 'text-[var(--color-text-muted)]')}>
      {feature.name}
    </span>
  </li>
)

const FeatureList = ({ features, activeIndex, onHover }: FeatureListProps) => {
  return (
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <FeatureListItem
          key={feature.name}
          feature={feature}
          isActive={activeIndex === index}
          onHover={() => onHover(index)}
        />
      ))}
    </ul>
  )
}

export default FeatureList
