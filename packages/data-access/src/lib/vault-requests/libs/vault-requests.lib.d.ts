import { VaultBlock, VaultBlockRequest } from '../../vault-blocks';
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
 */
export declare function getVaultRequestProcessingDate(block: VaultBlock, request: VaultBlockRequest): string | undefined;
