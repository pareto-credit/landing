/**
 * Client document basic structure
 */
export interface ClientDocument {
    /**
     * Entity identifier.
     */
    _id: string;
    /**
     * Entity creation date.
     */
    createdAt?: string;
    /**
     * The subject identifier who's created the entity.
     */
    createdBy?: string;
    /**
     * The last-update date.
     */
    updatedAt?: string;
    /**
     * The last-update subject identifier.
     */
    updatedBy?: string;
    /**
     * Entity deletion date.
     */
    deletedAt?: string;
    /**
     * The subject identifier who's deleted the entity.
     */
    deletedBy?: string;
}
/**
 * Client entity
 */
export interface ClientEntity extends ClientDocument {
    createdAt: string;
    createdBy?: string;
    updatedAt: string;
    updatedBy?: string;
}
export type ClientFields = '_id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy';
