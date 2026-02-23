import { Fragment } from 'react'
import { ArrowRight } from 'lucide-react'

interface Vault {
  name: string
  status: 'OPEN' | 'CLOSED' | 'COMING_SOON'
  apy: string
  tvl: string
  risk: string
  ratio: string
}

const vaults: Vault[] = [
  {
    name: 'USDC Prime Builder',
    status: 'OPEN',
    apy: '5.24%',
    tvl: '$42.5M',
    risk: 'AA',
    ratio: '120%',
  },
  {
    name: 'WETH Yield Strategy',
    status: 'OPEN',
    apy: '3.80%',
    tvl: '$18.2M',
    risk: 'A',
    ratio: '135%',
  },
  {
    name: 'WBTC Core Lending',
    status: 'CLOSED',
    apy: '2.10%',
    tvl: '$8.5M',
    risk: 'AAA',
    ratio: '150%',
  },
  {
    name: 'RWA Treasury Bill',
    status: 'COMING_SOON',
    apy: 'TBD',
    tvl: '$0.0M',
    risk: 'AAA',
    ratio: '105%',
  },
]

const ProductsSection = () => {
  return (
    <section id="products" className="overflow-hidden border-y border-white/5 bg-[#081912] py-24">
      <div className="mx-auto mb-12 flex max-w-7xl flex-col items-end justify-between gap-6 px-6 md:flex-row">
        <div>
          <div className="mb-4 font-mono text-xs uppercase tracking-widest text-[#70B19E]">Products</div>
          <h2 className="mb-4 text-4xl font-bold">Tokenized credit, built for scale.</h2>
          <p className="max-w-2xl text-lg text-gray-400">
            A modern fixed-income stack with the oversight, compliance, and reliability institutions
            expect.
          </p>
        </div>
        <button className="flex items-center gap-2 whitespace-nowrap border-b border-white pb-1 font-mono text-sm text-white transition-colors hover:border-[#70B19E] hover:text-[#70B19E]">
          Explore All Vaults <ArrowRight size={14} />
        </button>
      </div>

      <div className="group marquee-container w-full cursor-grab py-8 active:cursor-grabbing">
        <div className="marquee-content gap-6 px-6">
          {[...Array(2)].map((_, loopIndex) => (
            <Fragment key={`vault-loop-${loopIndex}`}>
              {vaults.map((vault) => (
                <div
                  key={`${loopIndex}-${vault.name}`}
                  className="min-w-[360px] flex-shrink-0 rounded border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-[#70B19E]/50 hover:bg-white/[0.04]"
                >
                  <div className="mb-6 flex items-start justify-between">
                    <h4 className="text-lg font-bold">{vault.name}</h4>
                    <span
                      className={`rounded px-2 py-1 font-mono text-[10px] ${
                        vault.status === 'OPEN'
                          ? 'border border-[#70B19E]/30 bg-[#70B19E]/20 text-[#70B19E]'
                          : vault.status === 'CLOSED'
                            ? 'border border-red-500/30 bg-red-500/20 text-red-400'
                            : 'border border-gray-500/30 bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {vault.status}
                    </span>
                  </div>

                  <div className="mb-8 grid grid-cols-2 gap-x-4 gap-y-6">
                    <div>
                      <div className="mb-1 text-xs text-gray-500">Net APY</div>
                      <div className="font-mono text-xl text-[#70B19E]">{vault.apy}</div>
                    </div>
                    <div>
                      <div className="mb-1 text-xs text-gray-500">Total Value Locked</div>
                      <div className="font-mono text-xl">{vault.tvl}</div>
                    </div>
                    <div>
                      <div className="mb-1 text-xs text-gray-500">Risk Tier</div>
                      <div className="font-mono text-sm">{vault.risk}</div>
                    </div>
                    <div>
                      <div className="mb-1 text-xs text-gray-500">Collateral Ratio</div>
                      <div className="font-mono text-sm">{vault.ratio}</div>
                    </div>
                  </div>

                  <button className="w-full rounded border border-white/10 py-3 font-mono text-sm transition-colors hover:bg-white/5">
                    View Vault
                  </button>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductsSection
