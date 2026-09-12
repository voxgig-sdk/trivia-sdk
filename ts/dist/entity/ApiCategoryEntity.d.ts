import { TriviaEntityBase } from '../TriviaEntityBase';
import type { TriviaSDK } from '../TriviaSDK';
import type { Control } from '../types';
import type { ApiCategory, ApiCategoryListMatch } from '../TriviaTypes';
declare class ApiCategoryEntity extends TriviaEntityBase<ApiCategory> {
    constructor(client: TriviaSDK, entopts: any);
    make(this: ApiCategoryEntity): ApiCategoryEntity;
    list(this: any, reqmatch?: ApiCategoryListMatch, ctrl?: Control): Promise<ApiCategoryEntity[]>;
}
export { ApiCategoryEntity };
