"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var parcel_1 = require("../libs/parcel");
var constants_1 = require("../constants/constants");
var fa_1 = require("../libs/fa");
var WorkbookPDFController = (function (_super) {
    __extends(WorkbookPDFController, _super);
    function WorkbookPDFController() {
        _super.apply(this, arguments);
    }
    WorkbookPDFController.prototype.pageNext = function (n) {
        this.dispatch('pdf:page', this.props.pageNumber + n);
    };
    WorkbookPDFController.prototype.writeRendering = function () {
        if (!this.isRendering) {
            return null;
        }
        return React.createElement(fa_1.default, {icon: "spinner", animation: "pulse"});
    };
    Object.defineProperty(WorkbookPDFController.prototype, "isRendering", {
        get: function () {
            return this.props.workbookState === constants_1.WorkbookState.Rendering;
        },
        enumerable: true,
        configurable: true
    });
    WorkbookPDFController.prototype.render = function () {
        var _this = this;
        var _a = this.props, pageNumber = _a.pageNumber, pageCount = _a.pageCount, dataURL = _a.dataURL;
        return React.createElement("section", {className: "pdf-tool"}, React.createElement("button", {className: "icon-button next", disabled: this.isRendering, onClick: function () { return _this.pageNext(+1); }}, React.createElement("div", null, React.createElement(fa_1.default, {icon: "chevron-right"})), React.createElement("p", null, "次ページ")), React.createElement("button", {className: "icon-button previous", disabled: this.isRendering, onClick: function () { return _this.pageNext(-1); }}, React.createElement("div", null, React.createElement(fa_1.default, {icon: "chevron-left"})), React.createElement("p", null, "前ページ")), React.createElement("div", {className: "page-number"}, React.createElement("label", null, pageNumber, "/", pageCount)), this.writeRendering());
    };
    return WorkbookPDFController;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkbookPDFController;
//# sourceMappingURL=pdf-controller.js.map