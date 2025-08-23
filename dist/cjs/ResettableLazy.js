"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Lazy_1 = tslib_1.__importDefault(require("./Lazy"));
class ResettableLazy extends Lazy_1.default {
    constructor(valueFactory) {
        super(valueFactory, true);
    }
    static create(valueFactory) {
        return new ResettableLazy(valueFactory);
    }
}
exports.default = ResettableLazy;
//# sourceMappingURL=ResettableLazy.js.map