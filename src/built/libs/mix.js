"use strict";
exports.mix = function (superclass) { return new MixinBuilder(superclass); };
var MixinBuilder = (function () {
    function MixinBuilder(superclass) {
        this.superclass = superclass;
    }
    MixinBuilder.prototype.with = function () {
        var mixins = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            mixins[_i - 0] = arguments[_i];
        }
        return mixins.reduce(function (c, mixin) { return mixin(c); }, this.superclass);
    };
    return MixinBuilder;
}());
//# sourceMappingURL=mix.js.map