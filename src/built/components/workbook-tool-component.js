"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ReactAddons = require("react-addons");
var parcel_1 = require("../libs/parcel");
var constants_1 = require("../constants/constants");
var fa_1 = require("../libs/fa");
var classSet = ReactAddons.classSet;
var WorkbookToolComponent = (function (_super) {
    __extends(WorkbookToolComponent, _super);
    function WorkbookToolComponent() {
        _super.apply(this, arguments);
    }
    WorkbookToolComponent.prototype.classesFor = function (tool) {
        var mode = this.props.mode;
        console.log(mode);
        return classSet({
            'icon-button': true,
            'active-button': mode === tool
        });
    };
    WorkbookToolComponent.prototype.render = function () {
        var _this = this;
        return React.createElement("div", {className: "tool-area"}, React.createElement("button", {className: this.classesFor(constants_1.ToolMode.SlidingPaper), onClick: function () { return _this.dispatch('tool:change:slide:paper'); }}, React.createElement("div", {className: "icon"}, React.createElement(fa_1.default, {icon: "hand-paper-o"})), React.createElement("p", null, "ページを移動")), React.createElement("button", {className: this.classesFor(constants_1.ToolMode.SlidingSheet), onClick: function () { return _this.dispatch('tool:change:slide:sheet'); }}, React.createElement("div", {className: "icon"}, React.createElement(fa_1.default, {icon: "file-o"}), " ", React.createElement(fa_1.default, {icon: "hand-paper-o"})), React.createElement("p", null, "シートを移動")), React.createElement("button", {className: this.classesFor(constants_1.ToolMode.DrawingMark), onClick: function () { return _this.dispatch('tool:change:draw:Marker'); }}, React.createElement("div", {className: "icon"}, React.createElement(fa_1.default, {icon: "pencil"})), React.createElement("p", null, "マーカーを追加")), React.createElement("button", {className: this.classesFor(constants_1.ToolMode.DeletingMark), onClick: function () { return _this.dispatch('tool:change:delete:marker'); }}, React.createElement("div", {className: "icon"}, React.createElement(fa_1.default, {icon: "eraser"})), React.createElement("p", null, "マーカーを消す")));
    };
    return WorkbookToolComponent;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkbookToolComponent;
//# sourceMappingURL=workbook-tool-component.js.map