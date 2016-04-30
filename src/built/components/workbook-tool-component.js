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
var _ = require('lodash');
var classSet = ReactAddons.classSet;
var WorkbookToolComponent = (function (_super) {
    __extends(WorkbookToolComponent, _super);
    function WorkbookToolComponent() {
        _super.apply(this, arguments);
        this.watched = ['thickness', 'scale', 'pageNumber', 'sheetVisibility', 'mode'];
    }
    WorkbookToolComponent.prototype.componentWillMount = function () {
        this.componentWillReceiveProps(this.props);
    };
    WorkbookToolComponent.prototype.componentWillReceiveProps = function (props) {
        this.setState(this.watched.reduce(function (a, k) {
            a[k] = props[k];
            return a;
        }, {}));
    };
    WorkbookToolComponent.prototype.prepare = function (props) {
        var _this = this;
        return !!this.watched.some(function (k) { return _this.state[k] !== props[k]; });
    };
    WorkbookToolComponent.prototype.shouldComponentUpdate = function (props, _) {
        return this.props.page !== props.page || this.prepare(props);
    };
    WorkbookToolComponent.prototype.cx = function (tool) {
        var mode = this.props.mode;
        return classSet({
            'icon-button': true,
            'active-button': mode === tool
        });
    };
    WorkbookToolComponent.prototype.classesVisibility = function () {
        return classSet({
            'icon-button': true,
            'active-button': this.props.sheetVisibility
        });
    };
    WorkbookToolComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, thickness = _a.thickness, sheetVisibility = _a.sheetVisibility;
        return React.createElement("div", {className: "tool-area"}, React.createElement("h1", null, "Sheet"), React.createElement("button", {className: this.classesVisibility(), onClick: function () { return _this.dispatch('sheet:display', !sheetVisibility); }}, React.createElement("div", {className: "icon"}, React.createElement(fa_1.default, {icon: "file"})), React.createElement("p", null, "シートを表示")), React.createElement("button", {className: "icon-button", onClick: function () { return _this.dispatch('workbook:position:reset'); }}, React.createElement("div", {className: "icon"}, React.createElement(fa_1.default, {icon: "copy"})), React.createElement("p", null, "位置をリセット")), React.createElement("button", {className: this.cx(constants_1.ToolMode.SlidingPaper), onClick: function () { return _this.dispatch('tool:change:slide:paper'); }}, React.createElement("div", {className: "icon"}, React.createElement(fa_1.default, {icon: "arrows"})), React.createElement("p", null, "ページを移動")), React.createElement("button", {className: this.cx(constants_1.ToolMode.SlidingSheet), onClick: function () { return _this.dispatch('tool:change:slide:sheet'); }}, React.createElement("div", {className: "icon"}, React.createElement(fa_1.default, {icon: "file"}), " ", React.createElement(fa_1.default, {icon: "arrows"})), React.createElement("p", null, "シートを移動")), React.createElement("h1", null, "Marker"), React.createElement("select", {className: "thickness", value: thickness, onChange: function (e) { return _this.dispatch('tool:thickness', +e.target.value); }}, _.times(10, function (n) { return React.createElement("option", {value: (n + 1) * 10, key: n}, (n + 1) * 10 + "px"); })), React.createElement("button", {className: this.cx(constants_1.ToolMode.DrawingMark), onClick: function () { return _this.dispatch('tool:change:draw:Marker'); }}, React.createElement("div", {className: "icon"}, React.createElement(fa_1.default, {icon: "pencil"})), React.createElement("p", null, "マーカーを追加")), React.createElement("button", {className: this.cx(constants_1.ToolMode.DeletingMark), onClick: function () { return _this.dispatch('tool:change:delete:marker'); }}, React.createElement("div", {className: "icon"}, React.createElement(fa_1.default, {icon: "eraser"})), React.createElement("p", null, "マーカーを消す")));
    };
    return WorkbookToolComponent;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkbookToolComponent;
//# sourceMappingURL=workbook-tool-component.js.map