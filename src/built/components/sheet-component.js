"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var marker_viewer_component_1 = require("./marker-viewer-component");
var SheetComponent = (function (_super) {
    __extends(SheetComponent, _super);
    function SheetComponent() {
        _super.apply(this, arguments);
    }
    SheetComponent.prototype.render = function () {
        var _a = this.props, page = _a.page, size = _a.size, sheetVisibility = _a.sheetVisibility, scale = _a.scale;
        var width = size.width, height = size.height;
        var _b = page.sheetPosition, x = _b.x, y = _b.y;
        if (!sheetVisibility) {
            return null;
        }
        return React.createElement("div", {className: "sheet-area", style: { left: x * scale, top: y * scale, width: width, height: height }}, React.createElement("div", {className: "sheet"}), React.createElement("div", {className: "markers", style: { left: -x * scale, top: -y * scale }}, React.createElement(marker_viewer_component_1.default, React.__spread({}, { page: page, scale: scale }))));
    };
    return SheetComponent;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SheetComponent;
//# sourceMappingURL=sheet-component.js.map