import { Axios } from 'axios';
import { Operator, OperatorsClientModel, OperatorsSearchQuery } from '../operator.model';
import { ApiEntity } from '../../core';
export declare class OperatorsClient extends ApiEntity implements OperatorsClientModel {
    constructor(axios: Axios);
    /**
     * Search operators by params
     * @param searchParams - the filters to apply
     * @returns an operators page
     */
    search(searchParams?: OperatorsSearchQuery): Promise<import("../../core").Page<Operator>>;
    /**
     * List operators by params
     * @param searchParams - the filters to apply
     * @returns the operators list
     */
    list(searchParams?: OperatorsSearchQuery): Promise<Operator[]>;
    /**
     * Find an operator by params
     * @param searchParams - the filters to apply
     * @returns an optional operator
     */
    findOne(searchParams?: OperatorsSearchQuery): Promise<Operator | undefined>;
}
