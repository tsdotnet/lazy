/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import DisposableBase from '@tsdotnet/disposable';

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
	protected readonly _resolveState: {
		created: null | boolean; // null = 'creating'
		value?: T,
		factory?: Func<T>,
		error?: unknown
	};

	protected constructor (
		valueFactory: Func<T>,
		private readonly _allowReset: boolean = false
	)
	{
		super(NAME);
		if(!valueFactory) throw new Error('\'valueFactory\' cannot be null or undefined.');
		this._resolveState = {
			created: false,
			factory: valueFactory
		};
	}

	/**
	 * True if the resolution faulted.
	 * @returns {boolean}
	 */
	get isFaulted (): boolean
	{
		return !!this._resolveState.error;
	}

	/**
	 * The error value if previous faulted.
	 */
	get error (): any
	{
		return this.getError();
	}

	/**
	 * Returns true if the value has been created.
	 */
	get isValueCreated (): boolean
	{
		return !!this._resolveState.created;
	}

	/**
	 * Will return true if allowReset is true and a value factory still exists.
	 * @returns {boolean}
	 */
	get canReset (): boolean
	{
		return this._allowReset && !!this._resolveState.factory;
	}

	/**
	 * Uses the provided factory to generate the value and returns that value for subsequent requests.
	 */
	getValue (): T
	{

		this.throwIfDisposed();
		const state = this._resolveState;
		// Do not continue if already faulted.
		if(state.error) throw state.error;
		if(state.created===null) throw new Error('Recursion detected.');
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		else if(state.created) return state.value!;

		const c = state.factory;
		if(!c) throw new Error('Unexpected resolution state.');

		state.created = null; // Mark this as 'resolving'.
		try
		{
			if(!this._allowReset) state.factory = undefined;
			const v = c();
			state.value = v;
			state.created = true;
			state.error = undefined;
			return v;
		}
		catch(ex)
		{
			state.value = undefined;
			state.created = false;
			state.error = ex;
			throw ex;
		}
	}

	/**
	 * Will attempt to reset this resolve if possible and returns true if successfully reset.
	 * @returns {boolean}
	 */
	tryReset (): boolean
	{
		if(!this._allowReset) return false;
		const state = this._resolveState;
		if(!state.factory) return false;
		else
		{
			state.created = false;
			state.value = undefined;
			state.error = undefined;
			return true;
		}
	}

	// Allows for overriding this behavior.
	protected getError (): unknown
	{
		return this._resolveState.error;
	}

	protected _onDispose (): void
	{
		const state = this._resolveState;
		state.factory = undefined;
		state.value = undefined;
		state.created = null;
		Object.freeze(state);
	}
}
