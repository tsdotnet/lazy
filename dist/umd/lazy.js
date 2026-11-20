(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tsdotnet/disposable')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tsdotnet/disposable'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.tsdotnet = global.tsdotnet || {}, global.tsdotnet.lazy = global.tsdotnet.lazy || {}), global.tsdotnet.disposable));
})(this, (function (exports, disposable) { 'use strict';

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     */
    class ResolverBase extends disposable.DisposableBase {
        _allowReset;
        _resolveState;
        constructor(valueFactory, _allowReset = false) {
            super();
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
            this.assertIsAlive();
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

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     */
    class Lazy extends ResolverBase {
        constructor(valueFactory, allowReset = false) {
            super(valueFactory, allowReset);
        }
        get value() {
            return this.getValue();
        }
        get valueReference() {
            return this._resolveState.value;
        }
        valueEquals(other) {
            if (this === other)
                return true;
            const val = this.value, o = other.value;
            if (val === o)
                return true;
            return typeof val === 'number' && typeof o === 'number' && isNaN(val) && isNaN(o);
        }
        static create(valueFactory, allowReset = false) {
            return new Lazy(valueFactory, allowReset);
        }
    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     */
    class ResettableLazy extends Lazy {
        constructor(valueFactory) {
            super(valueFactory, true);
        }
        static create(valueFactory) {
            return new ResettableLazy(valueFactory);
        }
    }

    /*!
     * @author electricessence / https://github.com/electricessence/
     * @license MIT
     */

    exports.Lazy = Lazy;
    exports.ResettableLazy = ResettableLazy;
    exports.ResolverBase = ResolverBase;
    exports.default = Lazy;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=lazy.js.map
