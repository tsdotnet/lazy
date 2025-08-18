import { describe, it, expect } from 'vitest';
import Lazy from '../src';
import ResettableLazy from '../src/ResettableLazy';

describe('Lazy', () => {
	it('should resolve value', () => {
		let i = 0;
		const lazy = Lazy.create(() => ++i);
		expect(lazy.canReset).toBe(false);
		expect(lazy.isValueCreated).toBe(false);
		expect(lazy.value).equal(1);
		expect(lazy.isValueCreated).toBe(true);
		expect(lazy.tryReset()).toBe(false);
		expect(lazy.value).equal(1);
		lazy.dispose();
		expect(lazy.isValueCreated).toBe(false);
		expect(lazy.tryReset()).toBe(false);
		expect(() => lazy.value).toThrow();
	});
});

describe('ResettableLazy', () => {
	it('should resolve value', () => {
		let i = 0;
		const lazy = ResettableLazy.create(() => ++i);
		expect(lazy.canReset).toBe(true);
		expect(lazy.isValueCreated).toBe(false);
		expect(lazy.value).equal(1);
		expect(lazy.isValueCreated).toBe(true);
		expect(lazy.tryReset()).toBe(true);
		expect(lazy.value).equal(2);
		lazy.dispose();
		expect(lazy.isValueCreated).toBe(false);
		expect(lazy.tryReset()).toBe(false);
		expect(() => lazy.value).toThrow();
	});
});
