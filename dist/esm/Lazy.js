import ResolverBase from './ResolverBase.js';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
class Lazy extends ResolverBase {
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

export { Lazy as default };
//# sourceMappingURL=Lazy.js.map
