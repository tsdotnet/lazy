/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
import Lazy from './Lazy';
export default class ResettableLazy<T> extends Lazy<T> {
    constructor(valueFactory: () => T);
    static create<T>(valueFactory: () => T): ResettableLazy<T>;
}
