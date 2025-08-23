import Lazy from './Lazy.js';

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

export { ResettableLazy as default };
//# sourceMappingURL=ResettableLazy.js.map
