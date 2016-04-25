"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var parcel_1 = require("../libs/parcel");
var constants_1 = require("../constants/constants");
var WorkbookComponent = (function (_super) {
    __extends(WorkbookComponent, _super);
    function WorkbookComponent() {
        _super.apply(this, arguments);
    }
    WorkbookComponent.prototype.writeController = function () {
        if (!this.props.file.isPDF) {
            return null;
        }
        return React.createElement(WorkbookPDFController, React.__spread({}, this.relayingProps()));
    };
    WorkbookComponent.prototype.render = function () {
        if (!this.props.file) {
            return React.createElement("div", null, "ロードされていません。");
        }
        var _a = this.props, markers = _a.markers, dataURL = _a.dataURL;
        return React.createElement("div", null, React.createElement("div", {className: "controller"}, React.createElement(WorkbookToolComponent, React.__spread({}, this.relayingProps())), this.writeController()), React.createElement(WorkbookViewerComponent, React.__spread({}, this.relayingProps())));
    };
    return WorkbookComponent;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkbookComponent;
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
        return 'rendering';
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
        return React.createElement("section", {className: "pdf-tool"}, React.createElement("div", {className: "label"}, React.createElement("label", null, pageNumber, "/", pageCount)), React.createElement("button", {className: "previous", disabled: this.isRendering, onClick: function () { return _this.pageNext(-1); }}, "prev"), React.createElement("button", {className: "next", disabled: this.isRendering, onClick: function () { return _this.pageNext(+1); }}, "next"), this.writeRendering());
    };
    return WorkbookPDFController;
}(parcel_1.Good));
var WorkbookToolComponent = (function (_super) {
    __extends(WorkbookToolComponent, _super);
    function WorkbookToolComponent() {
        _super.apply(this, arguments);
    }
    WorkbookToolComponent.prototype.render = function () {
        return React.createElement("div", {className: "tool-area"}, "tools ");
    };
    return WorkbookToolComponent;
}(parcel_1.Good));
var WorkbookViewerComponent = (function (_super) {
    __extends(WorkbookViewerComponent, _super);
    function WorkbookViewerComponent() {
        _super.apply(this, arguments);
    }
    WorkbookViewerComponent.prototype.render = function () {
        var dataURL = this.props.dataURL;
        return React.createElement("div", {className: "viewer-area"}, React.createElement("div", {className: "container"}, React.createElement("div", {className: "marker-area"}, this.props.markers), React.createElement("img", {src: dataURL})));
    };
    return WorkbookViewerComponent;
}(parcel_1.Good));
//# sourceMappingURL=workbook-component.js.map