/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import ResolverBase from './ResolverBase';
export default class Lazy<T> extends ResolverBase<T> {
    constructor(valueFactory: () => T, allowReset?: boolean);
    get value(): T;
    get valueReference(): T | undefined;
    valueEquals(other: Lazy<T>): boolean;
    static create<T>(valueFactory: () => T, allowReset?: boolean): Lazy<T>;
}
