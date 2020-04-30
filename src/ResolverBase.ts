/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */


import DisposableBase from "@tsdotnet/disposable";
type Func<T> = () => T;

const NAME: string = 'ResolverBase';

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * The ResolverBase class handles resolving a factory method and detects recursion.
 * Since JS does not have a synchronization mechanism (lock or otherwise)
 * we have to prevent getValue from double triggering the value factory (optimistic concurrency)
 * or returning return a value that is intermediate between resolving and resolved.
 */
export default abstract class ResolverBase<T>
	extends DisposableBase
{
	protected _isValueCreated: boolean | null; // null = 'creating'
	protected _value: T | undefined;

	protected constructor (
		protected _valueFactory: Func<T>,
		private readonly _allowReset: boolean = false,
	)
	{
		super(NAME);
		if(!_valueFactory) throw new Error('\'valueFactory\' cannot be null or undefined.');
		this._isValueCreated = false;
	}

	protected _error: any;

	// Allows for overriding this behavior.
	protected getError (): any
	{
		return this._error;
	}

	/**
	 * The error value if previous faulted.
	 */
	get error (): any
	{
		return this.getError();
	}

	/**
	 * True if the resolution faulted.
	 * @returns {boolean}
	 */
	get isFaulted (): boolean
	{
		return !!this._error;
	}

	/**
	 * Uses the provided factory to generate the value and returns that value for subsequent requests.
	 */
	getValue (): T
	{

		this.throwIfDisposed();
		// Do not continue if already faulted.
		if(this._error) throw this._error;
		if(this._isValueCreated===null) throw new Error('Recursion detected.');
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		else if(this._isValueCreated) return this._value!;

		const c = this._valueFactory;
		if(!c) throw new Error("Unexpected resolution state.");

		this._isValueCreated = null; // Mark this as 'resolving'.
		try
		{
			if(!this._allowReset) this._valueFactory = undefined as any;
			const v = c();
			this._value = v;
			this._error = void 0;
			this._isValueCreated = true;
			return v;
		}
		catch(ex)
		{
			this._isValueCreated = false;
			this._error = ex;
			throw ex;
		}
	}

	/**
	 * Will return true if allowReset is true and a value factory still exists.
	 * @returns {boolean}
	 */
	get canReset (): boolean
	{
		return this._allowReset && !!this._valueFactory;
	}

	protected _onDispose (): void
	{
		this._valueFactory = undefined as any;
		this._value = undefined;
		this._isValueCreated = null;
	}

	/**
	 * Will attempt to reset this resolve if possible and returns true if successfully reset.
	 * @returns {boolean}
	 */
	tryReset (): boolean
	{
		if(!this._valueFactory) return false;
		else
		{
			this._isValueCreated = false;
			this._value = undefined;
			this._error = undefined;
			return true;
		}
	}
}
