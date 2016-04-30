"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var parcel_1 = require("../libs/parcel");
var MarkerComponent = (function (_super) {
    __extends(MarkerComponent, _super);
    function MarkerComponent() {
        _super.apply(this, arguments);
    }
    MarkerComponent.prototype.onMouseDown = function (e) {
        this.dispatch('marker:click', this.props.marker, e.nativeEvent.which === 3);
    };
    MarkerComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, marker = _a.marker, scale = _a.scale;
        var wrapper = marker.wrapperCSS(scale);
        var inner = marker.innerCSS(scale);
        return React.createElement("div", {className: "marker", style: wrapper, onMouseDown: function (e) { return _this.onMouseDown(e); }}, React.createElement("div", {className: "marker-inner", style: inner}, " "));
    };
    return MarkerComponent;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MarkerComponent;
//# sourceMappingURL=marker-component.js.map