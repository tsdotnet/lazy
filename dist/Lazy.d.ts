/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
import ResolverBase from './ResolverBase';
export default class Lazy<T> extends ResolverBase<T> {
    constructor(valueFactory: () => T, allowReset?: boolean);
    /**
     * Returns true if the value has been created.
     */
    get isValueCreated(): boolean;
    /**
     * Returns the resolved value.
     */
    get value(): T;
    /**
     * Compares the values of two Lazy<T> for equality.
     * @param other
     * @returns {boolean}
     */
    valueEquals(other: Lazy<T>): boolean;
    /**
     * Creates a Lazy<T> by inferring T.
     * @param {() => T} valueFactory
     * @param {boolean} allowReset
     * @returns {Lazy<T>}
     */
    static create<T>(valueFactory: () => T, allowReset?: boolean): Lazy<T>;
}
