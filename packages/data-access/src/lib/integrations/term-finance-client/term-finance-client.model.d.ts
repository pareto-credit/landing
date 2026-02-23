export interface TermRepoCollateralResponse {
    termRepoCollaterals: {
        term?: {
            termRepoToken?: string;
            purchaseToken?: string;
        };
    }[];
}
export interface GraphQLResponse<T> {
    data?: T;
    errors?: {
        message: string;
    }[];
}
