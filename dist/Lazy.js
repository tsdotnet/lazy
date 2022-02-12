"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ResolverBase_1 = (0, tslib_1.__importDefault)(require("./ResolverBase"));
// We need a non-resettable lazy to ensure it can be passed safely around.
class Lazy extends ResolverBase_1.default {
    constructor(valueFactory, allowReset = false) {
        super(valueFactory, allowReset);
        this._disposableObjectName = 'Lazy';
    }
    /**
     * Returns the resolved value.
     */
    get value() {
        return this.getValue();
    }
    /**
     * Gets the value regardless if resolved or not.
     * Does not trigger the value factory.
     * @return {T | undefined}
     */
    get valueReference() {
        return this._resolveState.value;
    }
    /**
     * Compares the values of two Lazy<T> for equality.
     * @param other
     * @returns {boolean}
     */
    valueEquals(other) {
        if (this === other)
            return true;
        const val = this.value, o = other.value;
        if (val === o)
            return true;
        return typeof val === 'number' && typeof o === 'number' && isNaN(val) && isNaN(o);
    }
    /**
     * Creates a Lazy<T> by inferring T.
     * @param {() => T} valueFactory
     * @param {boolean} allowReset
     * @returns {Lazy<T>}
     */
    static create(valueFactory, allowReset = false) {
        return new Lazy(valueFactory, allowReset);
    }
}
exports.default = Lazy;
//# sourceMappingURL=Lazy.js.map