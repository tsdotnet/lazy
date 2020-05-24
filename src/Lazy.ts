/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import ResolverBase from './ResolverBase';

// We need a non-resettable lazy to ensure it can be passed safely around.
export default class Lazy<T>
	extends ResolverBase<T>
{
	constructor (
		valueFactory: () => T,
		allowReset: boolean = false)
	{
		super(valueFactory, allowReset);
		this._disposableObjectName = 'Lazy';
	}

	/**
	 * Returns the resolved value.
	 */
	get value (): T
	{
		return this.getValue();
	}

	/**
	 * Compares the values of two Lazy<T> for equality.
	 * @param other
	 * @returns {boolean}
	 */
	valueEquals (other: Lazy<T>): boolean
	{
		if (this===other) return true;
		const val = this.value, o = other.value;
		if (val===o) return true;
		return typeof val==='number' && typeof o==='number' && isNaN(val) && isNaN(o);
	}

	/**
	 * Creates a Lazy<T> by inferring T.
	 * @param {() => T} valueFactory
	 * @param {boolean} allowReset
	 * @returns {Lazy<T>}
	 */
	static create<T> (
		valueFactory: () => T,
		allowReset: boolean = false): Lazy<T>
	{
		return new Lazy<T>(valueFactory, allowReset);
	}
}
