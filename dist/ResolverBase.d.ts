/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import DisposableBase from '@tsdotnet/disposable';
declare type Func<T> = () => T;
/**
 * The ResolverBase class handles resolving a factory method and detects recursion.
 * Since JS does not have a synchronization mechanism (lock or otherwise)
 * we have to prevent getValue from double triggering the value factory (optimistic concurrency)
 * or returning return a value that is intermediate between resolving and resolved.
 */
export default abstract class ResolverBase<T> extends DisposableBase {
    private readonly _allowReset;
    protected readonly _resolveState: {
        created: null | boolean;
        value?: T;
        factory?: Func<T>;
        error?: unknown;
    };
    protected constructor(valueFactory: Func<T>, _allowReset?: boolean);
    protected getError(): unknown;
    /**
     * The error value if previous faulted.
     */
    get error(): any;
    /**
     * True if the resolution faulted.
     * @returns {boolean}
     */
    get isFaulted(): boolean;
    /**
     * Returns true if the value has been created.
     */
    get isValueCreated(): boolean;
    /**
     * Uses the provided factory to generate the value and returns that value for subsequent requests.
     */
    getValue(): T;
    /**
     * Will return true if allowReset is true and a value factory still exists.
     * @returns {boolean}
     */
    get canReset(): boolean;
    protected _onDispose(): void;
    /**
     * Will attempt to reset this resolve if possible and returns true if successfully reset.
     * @returns {boolean}
     */
    tryReset(): boolean;
}
export {};
