"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var parcel_1 = require("../libs/parcel");
var marker_viewer_component_1 = require("./marker-viewer-component");
var sheet_component_1 = require("./sheet-component");
var WorkbookViewerComponent = (function (_super) {
    __extends(WorkbookViewerComponent, _super);
    function WorkbookViewerComponent() {
        _super.apply(this, arguments);
    }
    WorkbookViewerComponent.prototype.render = function () {
        var _a = this.props, dataURL = _a.dataURL, page = _a.page, size = _a.size;
        if (!page) {
            return null;
        }
        var _b = page.pagePosition, x = _b.x, y = _b.y;
        return React.createElement("div", {className: "viewer-area"}, React.createElement("div", {className: "workbook-area", style: { left: x, top: y }}, React.createElement("div", {className: "marker-area"}, React.createElement(marker_viewer_component_1.default, React.__spread({}, this.relayingProps(), { page: page })), " ", React.createElement(sheet_component_1.default, React.__spread({}, this.relayingProps(), { page: page, size: size }))), React.createElement("img", {src: dataURL})));
    };
    return WorkbookViewerComponent;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkbookViewerComponent;
//# sourceMappingURL=workbook-viewer-component.js.map