"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_1 = require('react');
var Fa = (function (_super) {
    __extends(Fa, _super);
    function Fa() {
        _super.apply(this, arguments);
    }
    Fa.prototype.render = function () {
        var p = this.props;
        var classes = ['fa'];
        classes.push("fa-" + p.icon);
        p.scale && classes.push("fa-" + p.scale + "x");
        (p.fixedWidth === undefined || p.fixedWidth === true) && classes.push('fa-fw');
        p.list && classes.push('fa-li');
        p.border && classes.push('fa-border');
        p.pull && classes.push("fa-pull-" + p.pull);
        p.animation && classes.push("fa-" + p.animation);
        p.rotate && classes.push("fa-rotate-" + p.rotate);
        p.flip && classes.push("fa-flip-" + p.flip);
        return React.createElement("i", {className: classes.join(' ')});
    };
    return Fa;
}(react_1.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Fa;
//# sourceMappingURL=fa.js.map