import { ApiEntity } from './entity/ApiEntity';
import { ApiCategoryEntity } from './entity/ApiCategoryEntity';
export type * from './TriviaTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { TriviaEntityBase } from './TriviaEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class TriviaSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Api(entopts?: Record<string, any>): ApiEntity;
    ApiCategory(entopts?: Record<string, any>): ApiCategoryEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): TriviaSDK;
    tester(testopts?: any, sdkopts?: any): TriviaSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof TriviaSDK;
export { stdutil, config, BaseFeature, TriviaEntityBase, TriviaSDK, SDK, };
