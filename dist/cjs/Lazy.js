"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ResolverBase_1 = tslib_1.__importDefault(require("./ResolverBase"));
class Lazy extends ResolverBase_1.default {
    constructor(valueFactory, allowReset = false) {
        super(valueFactory, allowReset);
        this._disposableObjectName = 'Lazy';
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
exports.default = Lazy;
//# sourceMappingURL=Lazy.js.map