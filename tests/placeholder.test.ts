import { describe, it, expect } from 'vitest';
import Lazy from '../src';
import ResettableLazy from '../src/ResettableLazy';
import ResolverBase from '../src/ResolverBase';

// Test class to access protected methods
class TestResolver<T> extends ResolverBase<T> {
	constructor(factory: () => T, allowReset = false) {
		super(factory, allowReset);
	}

	public getErrorPublic(): unknown {
		return this.getError();
	}

	public getValue(): T {
		return super.getValue();
	}
}

describe('Lazy', () => {
	it('should resolve value once and cache it', () => {
		let i = 0;
		const lazy = Lazy.create(() => ++i);
		expect(lazy.canReset).toBe(false);
		expect(lazy.isValueCreated).toBe(false);
		expect(lazy.isFaulted).toBe(false);
		expect(lazy.value).toBe(1);
		expect(lazy.isValueCreated).toBe(true);
		expect(lazy.value).toBe(1); // should not increment again
		expect(lazy.tryReset()).toBe(false);
		lazy.dispose();
		expect(lazy.wasDisposed).toBe(true);
		expect(lazy.isValueCreated).toBe(false);
		expect(lazy.tryReset()).toBe(false);
		expect(() => lazy.value).toThrow();
	});

	it('should handle null and undefined values correctly', () => {
		const nullLazy = Lazy.create(() => null);
		expect(nullLazy.value).toBe(null);
		expect(nullLazy.isValueCreated).toBe(true);

		const undefinedLazy = Lazy.create(() => undefined);
		expect(undefinedLazy.value).toBe(undefined);
		expect(undefinedLazy.isValueCreated).toBe(true);
	});

	it('should throw on null factory', () => {
		expect(() => new Lazy(null as any)).toThrow('\'valueFactory\' cannot be null or undefined.');
	});

	it('should throw on undefined factory', () => {
		expect(() => new Lazy(undefined as any)).toThrow('\'valueFactory\' cannot be null or undefined.');
	});

	it('should handle factory errors and become faulted', () => {
		const error = new Error('Test error');
		const lazy = Lazy.create(() => { throw error; });
		
		expect(lazy.isFaulted).toBe(false);
		expect(lazy.error).toBeUndefined();
		expect(() => lazy.value).toThrow(error);
		expect(lazy.isFaulted).toBe(true);
		expect(lazy.error).toBe(error);
		expect(lazy.isValueCreated).toBe(false);
		
		// Should throw the same error on subsequent calls
		expect(() => lazy.value).toThrow(error);
		expect(lazy.error).toBe(error);
	});

	it('should detect recursion', () => {
		let lazy: Lazy<number>;
		lazy = Lazy.create(() => lazy.value + 1);
		
		expect(() => lazy.value).toThrow('Recursion detected.');
	});

	it('should handle valueReference property', () => {
		let i = 0;
		const lazy = Lazy.create(() => ++i);
		
		expect(lazy.valueReference).toBeUndefined();
		expect(lazy.value).toBe(1);
		expect(lazy.valueReference).toBe(1);
	});

	it('should compare values correctly with valueEquals', () => {
		const lazy1 = Lazy.create(() => 42);
		const lazy2 = Lazy.create(() => 42);
		const lazy3 = Lazy.create(() => 24);
		const nanLazy1 = Lazy.create(() => NaN);
		const nanLazy2 = Lazy.create(() => NaN);
		
		expect(lazy1.valueEquals(lazy1)).toBe(true); // same reference
		expect(lazy1.valueEquals(lazy2)).toBe(true); // same value
		expect(lazy1.valueEquals(lazy3)).toBe(false); // different value
		expect(nanLazy1.valueEquals(nanLazy2)).toBe(true); // both NaN
	});

	it('should handle allowReset constructor parameter', () => {
		let i = 0;
		const lazy = new Lazy(() => ++i, true);
		
		expect(lazy.canReset).toBe(true);
		expect(lazy.value).toBe(1);
		expect(lazy.tryReset()).toBe(true);
		expect(lazy.value).toBe(2);
	});

	it('should handle disposal after faulted state', () => {
		const lazy = Lazy.create(() => { throw new Error('Test'); });
		
		expect(() => lazy.value).toThrow();
		expect(lazy.isFaulted).toBe(true);
		
		lazy.dispose();
		expect(lazy.wasDisposed).toBe(true);
		expect(() => lazy.value).toThrow(); // Should throw disposal exception, not original error
	});

	it('should handle reset after factory error', () => {
		let shouldFail = true;
		const lazy = new Lazy(() => {
			if (shouldFail) throw new Error('Test error');
			return 'success';
		}, true);
		
		expect(() => lazy.value).toThrow('Test error');
		expect(lazy.isFaulted).toBe(true);
		
		// Reset and try again
		shouldFail = false;
		expect(lazy.tryReset()).toBe(true);
		expect(lazy.isFaulted).toBe(false);
		expect(lazy.value).toBe('success');
	});
});

describe('ResettableLazy', () => {
	it('should resolve and reset value', () => {
		let i = 0;
		const lazy = ResettableLazy.create(() => ++i);
		expect(lazy.canReset).toBe(true);
		expect(lazy.isValueCreated).toBe(false);
		expect(lazy.value).toBe(1);
		expect(lazy.isValueCreated).toBe(true);
		expect(lazy.tryReset()).toBe(true);
		expect(lazy.isValueCreated).toBe(false);
		expect(lazy.value).toBe(2);
		lazy.dispose();
		expect(lazy.isValueCreated).toBe(false);
		expect(lazy.tryReset()).toBe(false);
		expect(() => lazy.value).toThrow();
	});

	it('should handle multiple resets', () => {
		let i = 0;
		const lazy = ResettableLazy.create(() => ++i);
		
		expect(lazy.value).toBe(1);
		expect(lazy.tryReset()).toBe(true);
		expect(lazy.value).toBe(2);
		expect(lazy.tryReset()).toBe(true);
		expect(lazy.value).toBe(3);
		expect(lazy.tryReset()).toBe(true);
		expect(lazy.value).toBe(4);
	});

	it('should inherit all Lazy functionality', () => {
		const lazy = ResettableLazy.create(() => 'test');
		
		expect(lazy.valueReference).toBeUndefined();
		expect(lazy.value).toBe('test');
		expect(lazy.valueReference).toBe('test');
		expect(lazy.isValueCreated).toBe(true);
		
		// Should still handle errors
		const errorLazy = ResettableLazy.create(() => { throw new Error('test'); });
		expect(() => errorLazy.value).toThrow('test');
		expect(errorLazy.isFaulted).toBe(true);
	});

	it('should handle reset after error', () => {
		let shouldError = true;
		const lazy = ResettableLazy.create(() => {
			if (shouldError) throw new Error('Initial error');
			return 'success';
		});
		
		expect(() => lazy.value).toThrow('Initial error');
		expect(lazy.isFaulted).toBe(true);
		
		shouldError = false;
		expect(lazy.tryReset()).toBe(true);
		expect(lazy.isFaulted).toBe(false);
		expect(lazy.value).toBe('success');
		expect(lazy.isValueCreated).toBe(true);
	});
});

describe('ResolverBase (via TestResolver)', () => {
	it('should allow access to protected getError method', () => {
		const error = new Error('Test error');
		const resolver = new TestResolver(() => { throw error; });
		
		expect(resolver.getErrorPublic()).toBeUndefined();
		expect(() => resolver.getValue()).toThrow(error);
		expect(resolver.getErrorPublic()).toBe(error);
	});
});
