import moment from 'moment';
import { VaultTemplate, VaultTemplateParams } from '../vault.model';
/**
 * Sanitize a string for safe HTML rendering
 * @param input - the input string
 * @returns sanitized string
 */
export declare function sanitizeHtml(input: string): string;
/**
 * Render a vault template with the given parameters.
 * @param template vault template
 * @param params parameters to replace in the template
 * @returns rendered template
 */
export declare function renderVaultTemplate(template: VaultTemplate, params: VaultTemplateParams): string;
export declare function pickClosestBoundary(date: moment.Moment, boundaries: moment.Moment[]): moment.Moment | null;
export declare function roundStart(date: moment.Moment | null, startOf?: 'month' | 'week' | 'day'): string;
export declare function roundEnd(date: moment.Moment | null, endOf?: 'month' | 'week' | 'day'): string;
