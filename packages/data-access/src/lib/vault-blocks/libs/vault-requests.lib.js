import moment from 'moment';
/**
 * Get vault request processing date
 *
 * REDEEM -> normal withdraw (netting withdraw)
 * * isCurrentRequest = cdoEpoch.status === 'WAITING' && request.requestedOn > cdoEpoch.endDate
 * isCurrentRequest -> cdoEpoch.endDate + buffer + duration
 * !isCurrentRequest -> cdoEpoch.endDate
 *
 * DEPOSIT -> queue deposit request
 * * isCurrentRequest = cdoEpoch.status === 'RUNNING' && request.requestedOn < cdoEpoch.endDate
 * isCurrentRequest -> cdoEpoch.endDate
 * !isCurrentRequest -> cdoEpoch.startDate
 *
 * WITHDRAW -> queue withdraw (running normal withdraw)
 * * isCurrentRequest = cdoEpoch.status === 'RUNNING' && request.requestedOn < cdoEpoch.endDate
 * isCurrentRequest -> cdoEpoch.endDate + bufferDuration + duration
 * !isCurrentRequest -> cdoEpoch.endDate
 *
 * INSTANT_WITHDRAW -> queue withdraw (running instant withdraw)
 * * isCurrentRequest = cdoEpoch.status === 'RUNNING' && request.requestedOn < cdoEpoch.endDate
 * isCurrentRequest -> cdoEpoch.endDate + bufferDuration + instantWithdrawDuration
 * !isCurrentRequest -> cdoEpoch.startDate + instantWithdrawDuration
 *
 * @param block - the vault block
 * @param request - the vault block request
 * @returns the request processing date
 */ export function getVaultRequestProcessingDate(block, request) {
    const { cdoEpoch } = block;
    if (!cdoEpoch) {
        return;
    }
    const { duration, bufferDuration, instantWithdraws, startDate, endDate, status } = cdoEpoch;
    switch(request.type){
        /**
     * REDEEM -> normal withdraw (netting withdraw)
     * * isCurrentRequest = cdoEpoch.status === 'WAITING' && request.requestedOn > cdoEpoch.endDate
     * isCurrentRequest -> cdoEpoch.endDate + buffer + duration
     * !isCurrentRequest -> cdoEpoch.endDate
     */ case 'REDEEM':
            {
                const isCurrentRequest = status === 'WAITING' && moment(request.requestedOn).isAfter(moment(endDate));
                return isCurrentRequest ? moment(endDate).add(duration, 's').add(bufferDuration, 's').toISOString() : endDate;
            }
        /**
     * DEPOSIT -> queue deposit request
     * * isCurrentRequest = cdoEpoch.status === 'RUNNING' && request.requestedOn < cdoEpoch.endDate
     * isCurrentRequest -> cdoEpoch.endDate
     * !isCurrentRequest -> cdoEpoch.startDate
     */ case 'DEPOSIT':
            {
                const isCurrentRequest = status === 'RUNNING' && moment(request.requestedOn).isBefore(moment(endDate));
                return isCurrentRequest ? endDate : startDate;
            }
        /**
     * WITHDRAW -> queue withdraw (running normal withdraw)
     * * isCurrentRequest = cdoEpoch.status === 'RUNNING' && request.requestedOn < cdoEpoch.endDate
     * isCurrentRequest -> cdoEpoch.endDate + bufferDuration + duration
     * !isCurrentRequest -> cdoEpoch.endDate
     *
     * INSTANT_WITHDRAW -> queue withdraw (running instant withdraw)
     * * isCurrentRequest = cdoEpoch.status === 'RUNNING' && request.requestedOn < cdoEpoch.endDate
     * isCurrentRequest -> cdoEpoch.endDate + bufferDuration + instantWithdrawDuration
     * !isCurrentRequest -> cdoEpoch.startDate + instantWithdrawDuration
     */ case 'WITHDRAW':
            {
                const isCurrentRequest = status === 'RUNNING' && moment(request.requestedOn).isAfter(moment(startDate));
                /**
       * INSTANT WITHDRAW
       */ if (request.isInstant) {
                    const withdrawDelay = instantWithdraws == null ? void 0 : instantWithdraws.delay;
                    return isCurrentRequest ? moment(endDate).add(withdrawDelay, 's').add(bufferDuration, 's').toISOString() : moment(startDate).add(withdrawDelay, 's').toISOString();
                }
                return isCurrentRequest ? moment(endDate).add(duration, 's').add(bufferDuration, 's').toISOString() : endDate;
            }
    }
}

//# sourceMappingURL=vault-requests.lib.js.map