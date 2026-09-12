import { Context } from './Context';
declare class TriviaError extends Error {
    isTriviaError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { TriviaError };
