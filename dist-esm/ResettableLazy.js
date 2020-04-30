/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
import Lazy from './Lazy';
export default class ResettableLazy extends Lazy {
    constructor(valueFactory) {
        super(valueFactory, true);
        this._disposableObjectName = 'ResettableLazy';
    }
    static create(valueFactory) {
        return new ResettableLazy(valueFactory);
    }
}
//# sourceMappingURL=ResettableLazy.js.map