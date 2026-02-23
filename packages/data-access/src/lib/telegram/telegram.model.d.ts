import { ClientEntity } from '../core';
export type TgChatType = 'PRIVATE' | 'GROUP';
export declare function sTgChatType(): import("fluent-json-schema").StringSchema;
/**
 * TgSubscription: entity required to manage all the subscriptions
 * to the events notification.
 */
export interface TgSubscription extends TgSubscriptionData, ClientEntity {
}
export declare function sTgSubscription(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface TgSubscriptionData {
    tgChatId: string;
    tgUserId?: string;
    type?: TgChatType;
    title?: string;
    username?: string;
    userId?: string;
    walletId?: string;
    isVerified?: boolean;
    filters: TgSubscriptionFilters;
    options?: TgSubscriptionOptions;
    isActive: boolean;
}
export declare function sTgSubscriptionData(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface TgSubscriptionOptions {
    audience?: 'LENDER' | 'BORROWER' | 'MANAGER';
    epochAlerts?: TgEpochAlertOptions;
}
export interface TgEpochAlertOptions {
    leadMinutes?: number[];
}
export declare function sTgEpochAlertOptions(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sTgSubscriptionOptions(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type TgNotificationEvent = 'EPOCH_END' | 'EPOCH_PRE';
export declare function sTgNotificationEvent(): import("fluent-json-schema").StringSchema;
export interface TgNotification extends TgNotificationData, ClientEntity {
}
export declare function sTgNotification(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface TgNotificationData {
    tgSubscriptionId: string;
    vaultId: string;
    vaultEpochId: string;
    event: TgNotificationEvent;
    leadMinutes: number;
}
export declare function sTgNotificationData(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface TgSubscriptionFilters {
    vaultId?: string[];
    walletId?: string[];
}
export declare function sTgSubscriptionFilters(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
