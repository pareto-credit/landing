import { ApiEntity } from '../../core';
import { UserRoutes } from '../user.model';
export class UsersClient extends ApiEntity {
    /**
   * Search users by params
   * @param searchParams - the users search params
   * @returns the promise for search users
   */ search(searchParams) {
        return this._search(UserRoutes.v1Search, searchParams);
    }
    /**
   * List users by params
   * @param searchParams - the users search params
   * @returns the promise for search users
   */ list(searchParams) {
        return this._list(UserRoutes.v1Search, searchParams);
    }
    /**
   * Find a user by params
   * @param searchParams - the search params
   * @returns the promise for find a user
   */ findOne(searchParams) {
        return this._findOne(UserRoutes.v1Search, searchParams);
    }
    constructor(axios){
        super(axios);
    }
}

//# sourceMappingURL=users-client.lib.js.map