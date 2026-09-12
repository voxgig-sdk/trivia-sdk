import { TriviaEntityBase } from '../TriviaEntityBase';
import type { TriviaSDK } from '../TriviaSDK';
import type { Control } from '../types';
import type { Api, ApiListMatch } from '../TriviaTypes';
declare class ApiEntity extends TriviaEntityBase<Api> {
    constructor(client: TriviaSDK, entopts: any);
    make(this: ApiEntity): ApiEntity;
    list(this: any, reqmatch?: ApiListMatch, ctrl?: Control): Promise<ApiEntity[]>;
}
export { ApiEntity };
