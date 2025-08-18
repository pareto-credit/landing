import { sortBy } from 'lodash';
import { CHAINS_ORDER } from '../chain.const';
/**
 * Sort chains
 * @param chains - the array of chains
 * @returns the chains sorted
 */ export function sortChains(chains) {
    return sortBy(chains, (c)=>CHAINS_ORDER.indexOf(c.hex));
}

//# sourceMappingURL=chains.lib.js.map