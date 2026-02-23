"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RwaClient", {
    enumerable: true,
    get: function() {
        return RwaClient;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _axios = /*#__PURE__*/ _interop_require_default._(require("axios"));
const _core = require("../../core");
const _tokenlib = require("../../tokens/libs/token.lib");
const _moment = /*#__PURE__*/ _interop_require_default._(require("moment"));
const RWA_BASE_URL = 'https://ingestion-api.rwa.xyz/v1/assets/metrics';
let RwaClient = class RwaClient {
    async pushLatest() {
        const results = [];
        const fields = [
            '_id',
            'tokenId',
            'kyc',
            'contractType',
            'cdoEpoch',
            'rwa'
        ];
        const vaults = await this.api.vaults.list({
            status: 'READY',
            limit: 200,
            fields
        });
        const byDate = new Map();
        for (const vault of vaults){
            var _vault_rwa;
            const rwaTargets = (_vault_rwa = vault.rwa) == null ? void 0 : _vault_rwa.filter((t)=>t.isActive);
            if (!(rwaTargets == null ? void 0 : rwaTargets.length)) continue;
            const token = await this.api.tokens.readOne({
                _id: vault.tokenId
            });
            const latestBlock = await this.api.vaultLatestBlocks.readOne({
                vaultId: vault._id
            });
            this.logger.debug == null ? void 0 : this.logger.debug.call(this.logger, `RWA: processing vault ${vault._id}, latest block: ${(0, _moment.default)(normalizeTimestamp(latestBlock.block.timestamp)).format('YYYY-MM-DD HH:mm:ss')}`);
            if (vault.contractType === 'PARETO_DOLLAR') {
                this.addParetoDollarEntries(byDate, vault, token, latestBlock);
            } else if (vault.contractType === 'CDO_EPOCH') {
                var _vault_cdoEpoch;
                if (!vault.cdoEpoch) {
                    this.logger.debug == null ? void 0 : this.logger.debug.call(this.logger, `RWA: skipping vault ${vault._id} (missing cdoEpoch info)`);
                    continue;
                }
                const epochs = await this.api.vaultEpochs.list({
                    vaultId: vault._id,
                    sort: 'count',
                    order: 'desc',
                    limit: 2
                });
                const latest = epochs[0];
                const prev = epochs[1];
                if (!latest) continue;
                this.logger.debug == null ? void 0 : this.logger.debug.call(this.logger, `RWA: vault ${vault._id} latest epoch ${(0, _moment.default)(normalizeTimestamp(latest == null ? void 0 : latest.block.timestamp)).format('YYYY-MM-DD HH:mm:ss')}, prev epoch ${(0, _moment.default)(normalizeTimestamp(prev == null ? void 0 : prev.block.timestamp)).format('YYYY-MM-DD HH:mm:ss')})}`);
                const timestampMs = normalizeTimestamp(latestBlock.block.timestamp);
                const date = toDateString(timestampMs);
                if (!timestampMs || !date) continue;
                const snapshot = buildCdoEpochSnapshotForDate(token, latest, prev, (_vault_cdoEpoch = vault.cdoEpoch) == null ? void 0 : _vault_cdoEpoch.mode, date);
                if (!snapshot) continue;
                for (const t of rwaTargets){
                    const entry = buildMetricsEntry(snapshot, token, t.rwaId, vault);
                    if (!entry) continue;
                    const bucket = byDate.get(date) || {
                        payload: [],
                        items: []
                    };
                    bucket.payload.push(entry);
                    bucket.items.push({
                        vaultId: vault._id,
                        rwaId: t.rwaId
                    });
                    byDate.set(date, bucket);
                }
            } else {
                this.logger.debug == null ? void 0 : this.logger.debug.call(this.logger, `RWA: skipping vault ${vault._id} (contractType=${vault.contractType})`);
            }
        }
        for (const [date, batch] of byDate){
            const url = `${RWA_BASE_URL}/${date}`;
            try {
                if (this.dryRun) {
                    this.logger.info == null ? void 0 : this.logger.info.call(this.logger, `RWA ${date} dry-run: skipping PUT (${batch.payload.length} entries)`);
                    this.logger.info == null ? void 0 : this.logger.info.call(this.logger, {
                        url,
                        payload: batch.payload
                    }, 'RWA dry-run payload:');
                    for (const item of batch.items){
                        results.push({
                            date,
                            vaultId: item.vaultId,
                            rwaId: item.rwaId,
                            message: 'DRY_RUN'
                        });
                    }
                    continue;
                }
                const res = await this.axios.put(url, batch.payload, {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                });
                const message = getRwaResponseMessage(res.data) || String(res.status);
                this.logger.info == null ? void 0 : this.logger.info.call(this.logger, `RWA ${date}: ${message}`);
                for (const item of batch.items){
                    results.push({
                        date,
                        vaultId: item.vaultId,
                        rwaId: item.rwaId,
                        message: String(message)
                    });
                }
            } catch (error) {
                const message = getErrorMessage(error);
                throw new Error(`RWA ${date} failed: ${message}`);
            }
        }
        return {
            results
        };
    }
    initAxios() {
        const options = {
            headers: {
                'content-type': 'application/json'
            },
            timeout: 30000
        };
        return _axios.default.create(options);
    }
    addParetoDollarEntries(byDate, vault, token, block) {
        var _block_block;
        const rwaTargets = vault.rwa;
        if (!(rwaTargets == null ? void 0 : rwaTargets.length)) return;
        const timestampMs = normalizeTimestamp((_block_block = block.block) == null ? void 0 : _block_block.timestamp);
        const date = toDateString(timestampMs);
        if (!timestampMs || !date) return;
        const bucket = byDate.get(date) || {
            payload: [],
            items: []
        };
        for (const t of rwaTargets){
            const snapshot = t.type === 'sUSP' ? buildParetoDollarSnapshotSUSP(block, token, date) : buildParetoDollarSnapshotUSP(block, date);
            const entry = buildMetricsEntry(snapshot, token, t.rwaId, vault);
            if (!entry) continue;
            bucket.payload.push(entry);
            bucket.items.push({
                vaultId: vault._id,
                rwaId: t.rwaId
            });
        }
        byDate.set(date, bucket);
    }
    constructor(options){
        this.api = options.api;
        this.apiKey = options.apiKey;
        this.logger = options.logger || console;
        this.dryRun = Boolean(options.dryRun);
        this.axios = this.initAxios();
    }
};
function buildMetricsEntry(snapshot, token, rwaId, vault) {
    var _vault_kyc;
    if (!(0, _core.BNgt)(snapshot == null ? void 0 : snapshot.supply)) return null;
    const metrics = {
        net_asset_value: Number(snapshot.price.toFixed(token.decimals)),
        net_asset_value_dollar: Number(snapshot.price.toFixed(6)),
        token_supply_circulating: Number(snapshot.supply.toFixed(18)),
        aum: Number(snapshot.tvlToken.toFixed(token.decimals)),
        aum_dollar: Number(snapshot.tvlUSD.toFixed(6))
    };
    if (((_vault_kyc = vault.kyc) == null ? void 0 : _vault_kyc.hideSensitiveData) !== true) {
        const netYield1d = Number(snapshot.yieldToken.toFixed(token.decimals));
        if (netYield1d !== 0) metrics.net_yield_1d = netYield1d;
        const netYield1dDollar = Number(snapshot.yieldUSD.toFixed(6));
        if (netYield1dDollar !== 0) metrics.net_yield_1d_dollar = netYield1dDollar;
    }
    return {
        id: rwaId,
        metrics
    };
}
function buildParetoDollarSnapshotUSP(block, date) {
    const supply = (0, _tokenlib.fixAmount)(block.totalSupply, 18);
    return {
        date,
        supply,
        price: (0, _core.BNify)(1),
        tvlToken: supply,
        tvlUSD: supply,
        yieldToken: (0, _core.BNify)(0),
        yieldUSD: (0, _core.BNify)(0)
    };
}
function buildParetoDollarSnapshotSUSP(block, token, date) {
    var _block_paretoDollar_staking, _block_paretoDollar, _block_TVL, _block_TVL1, _block_APYs;
    const supply = (0, _tokenlib.fixTokenAmount)(token, ((_block_paretoDollar = block.paretoDollar) == null ? void 0 : (_block_paretoDollar_staking = _block_paretoDollar.staking) == null ? void 0 : _block_paretoDollar_staking.totalAssets) || 0);
    const price = (0, _tokenlib.fixTokenAmount)(token, block.price);
    const tvlToken = (0, _tokenlib.fixTokenAmount)(token, ((_block_TVL = block.TVL) == null ? void 0 : _block_TVL.token) || 0);
    const tvlUSD = (0, _tokenlib.fixAmount)(((_block_TVL1 = block.TVL) == null ? void 0 : _block_TVL1.USD) || 0, 6);
    const yieldRate1d = (0, _core.BNify)(((_block_APYs = block.APYs) == null ? void 0 : _block_APYs.NET) || 0).div(36500);
    const yieldToken = tvlToken.times(yieldRate1d);
    const yieldUSD = tvlUSD.times(yieldRate1d);
    return {
        date,
        supply,
        price,
        tvlToken,
        tvlUSD,
        yieldToken,
        yieldUSD
    };
}
function computeEpochData(epoch, token) {
    var _epoch_APYs;
    const tvl = epoch.TVL;
    const interest = epoch.interest;
    const supply = (0, _tokenlib.fixAmount)(epoch.totalSupply || 0, 18);
    const startTvlToken = (0, _tokenlib.fixTokenAmount)(token, tvl.token);
    const startTvlUSD = (0, _tokenlib.fixAmount)(tvl.USD, 6);
    const grossInterest = (0, _tokenlib.fixTokenAmount)(token, (interest == null ? void 0 : interest.GROSS) || 0);
    const tokenToUsdRatio = startTvlToken.gt(0) && startTvlUSD.gt(0) ? startTvlUSD.div(startTvlToken) : (0, _core.BNify)(1);
    const grossInterestUSD = grossInterest.times(tokenToUsdRatio);
    const startPrice = (0, _tokenlib.fixAmount)(epoch.price, token.decimals);
    const yieldRate1d = (0, _core.BNify)(((_epoch_APYs = epoch.APYs) == null ? void 0 : _epoch_APYs.NET) || 0).div(36500);
    const yieldToken = startTvlToken.times(yieldRate1d);
    const yieldUSD = startTvlUSD.times(yieldRate1d);
    return {
        supply,
        startTvlToken,
        startTvlUSD,
        grossInterest,
        grossInterestUSD,
        startPrice,
        yieldRate1d,
        yieldToken,
        yieldUSD
    };
}
function buildCdoEpochSnapshotForDate(token, epoch, prevEpoch, epochMode, date) {
    const data = computeEpochData(epoch, token);
    const prevData = prevEpoch ? computeEpochData(prevEpoch, token) : undefined;
    const dailyYield = (()=>{
        if (epochMode === 'STRATEGY') {
            if (!prevData) return {
                yieldToken: (0, _core.BNify)(0),
                yieldUSD: (0, _core.BNify)(0)
            };
            return {
                yieldToken: prevData.yieldToken,
                yieldUSD: prevData.yieldUSD
            };
        }
        return {
            yieldToken: data.yieldToken,
            yieldUSD: data.yieldUSD
        };
    })();
    const tvlToken = data.startTvlToken;
    const tvlUSD = data.startTvlUSD;
    const price = data.startPrice;
    return {
        date,
        supply: data.supply,
        price,
        tvlToken,
        tvlUSD,
        yieldToken: dailyYield.yieldToken,
        yieldUSD: dailyYield.yieldUSD
    };
}
function normalizeTimestamp(value) {
    if (!value) return 0;
    if (value instanceof Date) {
        const t = value.getTime();
        return Number.isFinite(t) ? t : 0;
    }
    const num = Number(value);
    if (Number.isFinite(num)) {
        return num > 1e12 ? num : num * 1000;
    }
    const parsed = Date.parse(String(value));
    return Number.isFinite(parsed) ? parsed : 0;
}
// Always send previous day date string
function toDateString(timestamp) {
    const date = new Date(timestamp);
    return (0, _moment.default)(date).subtract(1, 'day').format('YYYY-MM-DD');
}
function getRwaResponseMessage(data) {
    if (!data || typeof data !== 'object') return null;
    const record = data;
    var _record_message;
    const message = (_record_message = record['message']) != null ? _record_message : record['status'];
    if (typeof message === 'string' || typeof message === 'number') {
        return String(message);
    }
    return null;
}
function getErrorMessage(error) {
    if (_axios.default.isAxiosError(error)) {
        var _error_response, _error_response1;
        const status = (_error_response = error.response) == null ? void 0 : _error_response.status;
        const data = (_error_response1 = error.response) == null ? void 0 : _error_response1.data;
        const responsePart = typeof data === 'string' ? data : safeJson(data) || undefined;
        if (status && responsePart) return `HTTP ${status}: ${responsePart}`;
        if (status) return `HTTP ${status}: ${error.message}`;
        return responsePart || error.message;
    }
    if (error instanceof Error) return error.message;
    return String(error);
}
function safeJson(value) {
    try {
        return JSON.stringify(value);
    } catch (e) {
        return null;
    }
}

//# sourceMappingURL=rwa-client.js.map