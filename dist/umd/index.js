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
        define(["require", "exports", "tslib", "./Lazy", "./ResettableLazy", "./ResolverBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Lazy = exports.ResettableLazy = exports.ResolverBase = void 0;
    const tslib_1 = require("tslib");
    const Lazy_1 = tslib_1.__importDefault(require("./Lazy"));
    exports.Lazy = Lazy_1.default;
    const ResettableLazy_1 = tslib_1.__importDefault(require("./ResettableLazy"));
    exports.ResettableLazy = ResettableLazy_1.default;
    const ResolverBase_1 = tslib_1.__importDefault(require("./ResolverBase"));
    exports.ResolverBase = ResolverBase_1.default;
    exports.default = Lazy_1.default;
});
//# sourceMappingURL=index.js.map