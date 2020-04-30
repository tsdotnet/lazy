/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import Lazy from './Lazy';

export default class ResettableLazy<T>
	extends Lazy<T>
{
	constructor (valueFactory: () => T)
	{
		super(valueFactory, true);
		this._disposableObjectName = 'ResettableLazy';
	}

	static create<T> (valueFactory: () => T): ResettableLazy<T>
	{
		return new ResettableLazy<T>(valueFactory);
	}
}
