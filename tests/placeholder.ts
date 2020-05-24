import {expect} from 'chai';
import Lazy from '../src';
import ResettableLazy from '../src/ResettableLazy';

describe('Lazy', () => {
	it('should resolve value', () => {
		let i = 0;
		const lazy = Lazy.create(() => ++i);
		expect(lazy.canReset).to.be.false;
		expect(lazy.isValueCreated).to.be.false;
		expect(lazy.value).equal(1);
		expect(lazy.isValueCreated).to.be.true;
		expect(lazy.tryReset()).to.be.false;
		expect(lazy.value).equal(1);
		lazy.dispose();
		expect(lazy.isValueCreated).to.be.false;
		expect(lazy.tryReset()).to.be.false;
		expect(() => lazy.value).to.throw();
	});
});

describe('ResettableLazy', () => {
	it('should resolve value', () => {
		let i = 0;
		const lazy = ResettableLazy.create(() => ++i);
		expect(lazy.canReset).to.be.true;
		expect(lazy.isValueCreated).to.be.false;
		expect(lazy.value).equal(1);
		expect(lazy.isValueCreated).to.be.true;
		expect(lazy.tryReset()).to.be.true;
		expect(lazy.value).equal(2);
		lazy.dispose();
		expect(lazy.isValueCreated).to.be.false;
		expect(lazy.tryReset()).to.be.false;
		expect(() => lazy.value).to.throw();
	});
});
