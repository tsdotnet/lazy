/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { DisposableBase } from '@tsdotnet/disposable';
type Func<T> = () => T;
export default abstract class ResolverBase<T> extends DisposableBase {
    private readonly _allowReset;
    protected readonly _resolveState: {
        created: null | boolean;
        value?: T;
        factory?: Func<T>;
        error?: unknown;
    };
    protected constructor(valueFactory: Func<T>, _allowReset?: boolean);
    get isFaulted(): boolean;
    get error(): any;
    get isValueCreated(): boolean;
    get canReset(): boolean;
    getValue(): T;
    tryReset(): boolean;
    protected getError(): unknown;
    protected _onDispose(): void;
}
export {};
