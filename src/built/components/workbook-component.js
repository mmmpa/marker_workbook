"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var parcel_1 = require("../libs/parcel");
var constants_1 = require("../constants/constants");
var workbook_tool_component_1 = require("./workbook-tool-component");
var workbook_viewer_component_1 = require("./workbook-viewer-component");
var pdf_controller_1 = require("./pdf-controller");
var WorkbookComponent = (function (_super) {
    __extends(WorkbookComponent, _super);
    function WorkbookComponent() {
        _super.apply(this, arguments);
    }
    WorkbookComponent.prototype.onMouseDown = function (e) {
        e.preventDefault();
        var target = e.target;
        var _a = this.mousePosition(e), x = _a.x, y = _a.y;
        var isRight = e.nativeEvent.which === 3;
        this.detectPressAction(isRight)(x, y, target);
    };
    WorkbookComponent.prototype.detectPressAction = function (isRight) {
        var _this = this;
        if (isRight === void 0) { isRight = false; }
        var _a = this.props, mode = _a.mode, keyControl = _a.keyControl;
        switch (true) {
            case keyControl.isDown('Space') || mode === constants_1.ToolMode.SlidingPaper:
                return function (x, y) { return _this.startDrag(x, y, isRight); };
            case mode === constants_1.ToolMode.SlidingSheet:
                return function (x, y) { return _this.startDrag(x, y, !isRight); };
            case mode === constants_1.ToolMode.DeletingMark:
                return isRight
                    ? function (x, y) { return _this.startDrawMarker(x, y); }
                    : function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        return null;
                    };
            default:
                return isRight
                    ? function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        return null;
                    }
                    : function (x, y) { return _this.startDrawMarker(x, y); };
        }
    };
    WorkbookComponent.prototype.startDrawMarker = function (startX, startY) {
        var _this = this;
        var scale = this.props.scale;
        var offsetX = -this.props.page.pagePosition.x;
        var offsetY = -this.props.page.pagePosition.y;
        var marker = this.props.page.newMarker((startX + offsetX) / scale, (startY + offsetY) / scale, this.props.thickness);
        var move = function (e) {
            var _a = _this.mousePosition(e), x = _a.x, y = _a.y;
            marker.to((x + offsetX) / scale, (y + offsetY) / scale);
            _this.props.page.update();
            _this.setState({});
        };
        var clear = function () {
            $(window).off('mouseup', clear);
            $(window).off('mousemove', move);
            _this.dispatch('workbook:save');
        };
        $(window).on('mousemove', move);
        $(window).on('mouseup', clear);
    };
    WorkbookComponent.prototype.startDrag = function (startX, startY, isRight) {
        var _this = this;
        if (isRight === void 0) { isRight = false; }
        var drag = this.detectDragAction(isRight);
        var pre = { x: startX, y: startY };
        var move = function (e) {
            var _a = _this.mousePosition(e), x = _a.x, y = _a.y;
            drag(startX, startY, pre.x, pre.y, x, y);
            pre = { x: x, y: y };
        };
        var clear = function () {
            $(window).off('mouseup', clear);
            $(window).off('mousemove', move);
            _this.dispatch('workbook:save');
        };
        $(window).on('mousemove', move);
        $(window).on('mouseup', clear);
    };
    WorkbookComponent.prototype.detectDragAction = function (isRight) {
        var _this = this;
        if (isRight === void 0) { isRight = false; }
        return isRight
            ? function (startX, startY, x, y, endX, endY) { return _this.slideSheet(x, y, endX, endY); }
            : function (startX, startY, x, y, endX, endY) { return _this.slidePage(x, y, endX, endY); };
    };
    WorkbookComponent.prototype.onPressDouble = function (x, y) {
        this.dispatch('workspace:press:double', x, y);
    };
    WorkbookComponent.prototype.slideSheet = function (x, y, endX, endY) {
        this.props.page.moveSheet(endX - x, endY - y);
        this.setState({});
    };
    WorkbookComponent.prototype.slidePage = function (x, y, endX, endY) {
        this.props.page.movePage(endX - x, endY - y);
        this.setState({});
    };
    WorkbookComponent.prototype.mousePosition = function (e) {
        var x = e.pageX - this.workspace.offsetLeft - 100;
        var y = e.pageY - this.workspace.offsetTop - 40;
        return { x: x, y: y };
    };
    Object.defineProperty(WorkbookComponent.prototype, "workspace", {
        get: function () {
            return this.refs['workspace'];
        },
        enumerable: true,
        configurable: true
    });
    WorkbookComponent.prototype.writeController = function () {
        if (!this.props.file.isPDF) {
            return null;
        }
        var _a = this.props, pageNumber = _a.pageNumber, pageCount = _a.pageCount, workbookState = _a.workbookState, scale = _a.scale;
        return React.createElement(pdf_controller_1.default, React.__spread({}, { pageNumber: pageNumber, pageCount: pageCount, workbookState: workbookState, scale: scale }));
    };
    WorkbookComponent.prototype.render = function () {
        var _this = this;
        if (!this.props.file) {
            return React.createElement("div", {className: "workbook-component", ref: "workspace"}, React.createElement("div", {className: "workbook-controller"}));
        }
        var _a = this.props, mode = _a.mode, page = _a.page, size = _a.size, dataURL = _a.dataURL, thickness = _a.thickness, sheetVisibility = _a.sheetVisibility, scale = _a.scale;
        return React.createElement("div", {className: "workbook-component", ref: "workspace"}, React.createElement("div", {className: "workbook-controller"}, React.createElement(workbook_tool_component_1.default, React.__spread({}, { mode: mode, thickness: thickness, sheetVisibility: sheetVisibility })), this.writeController()), React.createElement("div", {className: "workbook-container", onMouseDown: function (e) { return _this.onMouseDown(e); }, onContextMenu: function (e) { return e.preventDefault(); }}, React.createElement(workbook_viewer_component_1.default, React.__spread({}, { page: page, size: size, dataURL: dataURL, sheetVisibility: sheetVisibility, scale: scale }))));
    };
    return WorkbookComponent;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkbookComponent;
//# sourceMappingURL=workbook-component.js.map