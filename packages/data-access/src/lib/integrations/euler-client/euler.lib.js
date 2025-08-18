import { BigNumber, utils } from 'ethers';
function getSubAccount(owner, id) {
    return utils.getAddress(BigNumber.from(owner).xor(id).toHexString());
}
export function getEulerSubAccounts(owner) {
    return Array.from({
        length: 256
    }, (_, id)=>{
        const subAccount = getSubAccount(owner, id);
        return subAccount;
    });
}

//# sourceMappingURL=euler.lib.js.map