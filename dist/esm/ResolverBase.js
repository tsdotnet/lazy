import { DisposableBase } from '@tsdotnet/disposable';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
const NAME = 'ResolverBase';
class ResolverBase extends DisposableBase {
    _allowReset;
    _resolveState;
    constructor(valueFactory, _allowReset = false) {
        super(NAME);
        this._allowReset = _allowReset;
        if (!valueFactory)
            throw new Error('\'valueFactory\' cannot be null or undefined.');
        this._resolveState = {
            created: false,
            factory: valueFactory
        };
    }
    get isFaulted() {
        return !!this._resolveState.error;
    }
    get error() {
        return this.getError();
    }
    get isValueCreated() {
        return !!this._resolveState.created;
    }
    get canReset() {
        return this._allowReset && !!this._resolveState.factory;
    }
    getValue() {
        this.throwIfDisposed();
        const state = this._resolveState;
        if (state.error)
            throw state.error;
        if (state.created === null)
            throw new Error('Recursion detected.');
        else if (state.created)
            return state.value;
        const c = state.factory;
        if (!c)
            throw new Error('Unexpected resolution state.');
        state.created = null;
        try {
            if (!this._allowReset)
                delete state.factory;
            const v = c();
            state.value = v;
            state.created = true;
            delete state.error;
            return v;
        }
        catch (ex) {
            delete state.value;
            state.created = false;
            state.error = ex;
            throw ex;
        }
    }
    tryReset() {
        if (!this._allowReset)
            return false;
        const state = this._resolveState;
        if (!state.factory)
            return false;
        else {
            state.created = false;
            delete state.value;
            delete state.error;
            return true;
        }
    }
    getError() {
        return this._resolveState.error;
    }
    _onDispose() {
        const state = this._resolveState;
        delete state.factory;
        delete state.value;
        state.created = null;
        Object.freeze(state);
    }
}

export { ResolverBase as default };
//# sourceMappingURL=ResolverBase.js.map
