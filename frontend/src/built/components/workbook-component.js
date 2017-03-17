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
    Object.defineProperty(WorkbookComponent.prototype, "currentPage", {
        get: function () {
            return this.props.workbook.currentPage;
        },
        enumerable: true,
        configurable: true
    });
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
        var offsetX = -this.currentPage.pagePosition.x;
        var offsetY = -this.currentPage.pagePosition.y;
        var marker = this.currentPage.newMarker((startX + offsetX) / scale, (startY + offsetY) / scale, this.props.thickness);
        var move = function (e) {
            var _a = _this.mousePosition(e), x = _a.x, y = _a.y;
            marker.to((x + offsetX) / scale, (y + offsetY) / scale);
            _this.currentPage.updateMarker();
            _this.setState({});
        };
        var clear = function () {
            $(window).unbind('mouseup', clear);
            $(window).unbind('mousemove', move);
            _this.dispatch('workbook:save');
        };
        $(window).bind('mousemove', move);
        $(window).bind('mouseup', clear);
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
        this.currentPage.moveSheet(endX - x, endY - y);
        this.setState({});
    };
    WorkbookComponent.prototype.slidePage = function (x, y, endX, endY) {
        this.currentPage.movePage(endX - x, endY - y);
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
    WorkbookComponent.prototype.render = function () {
        var _this = this;
        if (!this.props.file) {
            return React.createElement("div", {className: "workbook-component", ref: "workspace"}, React.createElement("div", {className: "workbook-controller"}));
        }
        var _a = this.props, workbook = _a.workbook, mode = _a.mode, size = _a.size, dataURL = _a.dataURL, thickness = _a.thickness, sheetVisibility = _a.sheetVisibility, scale = _a.scale, workbookState = _a.workbookState;
        return React.createElement("div", {className: "workbook-component", ref: "workspace"}, React.createElement("div", {className: "workbook-controller"}, React.createElement(workbook_tool_component_1.default, React.__spread({}, { workbook: workbook, mode: mode, thickness: thickness, sheetVisibility: sheetVisibility })), " ", React.createElement(pdf_controller_1.default, React.__spread({}, { workbook: workbook, workbookState: workbookState, scale: scale }))), React.createElement("div", {className: "workbook-container", onMouseDown: function (e) { return _this.onMouseDown(e); }, onContextMenu: function (e) { return e.preventDefault(); }}, React.createElement(workbook_viewer_component_1.default, React.__spread({}, { workbook: workbook, size: size, dataURL: dataURL, sheetVisibility: sheetVisibility, scale: scale }))));
    };
    return WorkbookComponent;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkbookComponent;
//# sourceMappingURL=workbook-component.js.map