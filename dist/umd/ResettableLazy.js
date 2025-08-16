/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./Lazy"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require("tslib");
    const Lazy_1 = tslib_1.__importDefault(require("./Lazy"));
    class ResettableLazy extends Lazy_1.default {
        constructor(valueFactory) {
            super(valueFactory, true);
            this._disposableObjectName = 'ResettableLazy';
        }
        static create(valueFactory) {
            return new ResettableLazy(valueFactory);
        }
    }
    exports.default = ResettableLazy;
});
//# sourceMappingURL=ResettableLazy.js.map