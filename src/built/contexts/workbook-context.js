"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require("../libs/parcel");
var constants_1 = require("../constants/constants");
var workbook_1 = require("../models/workbook");
var WorkbookContext = (function (_super) {
    __extends(WorkbookContext, _super);
    function WorkbookContext() {
        _super.apply(this, arguments);
    }
    WorkbookContext.prototype.componentWillMount = function () {
        _super.prototype.componentWillMount.call(this);
        this.setState({
            type: null,
            pageNumber: 0,
            pageCount: 0,
            mode: constants_1.ToolMode.DrawingMark,
            shortCut: null
        });
        this.componentWillReceiveProps(this.props);
    };
    WorkbookContext.prototype.componentWillReceiveProps = function (props) {
        if (this.props.file !== props.file) {
            this.initialize(props.file);
        }
    };
    WorkbookContext.prototype.listen = function (to) {
        var _this = this;
        to(null, 'pdf:page', function (n) { return _this.page(n); });
        to(null, 'tool:change:slide:paper', function () { return _this.setState({ mode: constants_1.ToolMode.SlidingPaper }); });
        to(null, 'tool:change:slide:sheet', function () { return _this.setState({ mode: constants_1.ToolMode.SlidingSheet }); });
        to(null, 'tool:change:draw:Marker', function () { return _this.setState({ mode: constants_1.ToolMode.DrawingMark }); });
        to(null, 'tool:change:delete:marker', function () { return _this.setState({ mode: constants_1.ToolMode.DeletingMark }); });
        to(null, 'workspace:press', function (x, y, isRight) { return _this.pressWorkspace(x, y, isRight); });
        to(null, 'workspace:drag', function (startX, startY, x, y, endX, endY, isRight) { return _this.dragWorkspace(startX, startY, x, y, endX, endY, isRight); });
    };
    WorkbookContext.prototype.pressWorkspace = function (x, y, isRight) {
        var _this = this;
        if (isRight === void 0) { isRight = false; }
        this.setShortCut(function () { return _this.detectPressAction(isRight)(x, y); });
    };
    WorkbookContext.prototype.dragWorkspace = function (startX, startY, x, y, endX, endY, isRight) {
        if (isRight === void 0) { isRight = false; }
        this.detectDragAction(isRight)(startX, startY, x, y, endX, endY);
    };
    WorkbookContext.prototype.setShortCut = function (callback) {
        switch (true) {
            case this.props.keyControl.isDown('Space'):
                return this.setState({ shortCut: constants_1.ShortCut.Slide }, callback);
            default:
                return this.setState({ shortCut: null }, callback);
        }
    };
    WorkbookContext.prototype.detectPressAction = function (isRight) {
        var _this = this;
        if (isRight === void 0) { isRight = false; }
        switch (this.state.mode) {
            default:
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    return null;
                };
                return isRight
                    ? function (x, y) { return _this.draw(x, y, _this.rightColor); }
                    : function (x, y) { return _this.draw(x, y, _this.leftColor); };
        }
    };
    WorkbookContext.prototype.detectDragAction = function (isRight) {
        var _this = this;
        if (isRight === void 0) { isRight = false; }
        switch (true) {
            case this.state.shortCut === constants_1.ShortCut.Slide:
                return isRight
                    ? function (startX, startY, x, y, endX, endY) { return _this.slideSheet(x, y, endX, endY); }
                    : function (startX, startY, x, y, endX, endY) { return _this.slidePage(x, y, endX, endY); };
            default:
                return function (x, y, endX, endY) { return _this.drawMarker(x, y, endX, endY, _this.rightColor); };
        }
    };
    WorkbookContext.prototype.slideSheet = function (x, y, endX, endY) {
        console.log('slide sheet');
        this.state.page.moveSheet(endX - x, endY - y);
        this.setState({});
    };
    WorkbookContext.prototype.slidePage = function (x, y, endX, endY) {
        console.log('slide page');
        this.state.page.movePage(endX - x, endY - y);
        this.setState({});
    };
    Object.defineProperty(WorkbookContext.prototype, "isLoaded", {
        get: function () {
            return !!this.props.file;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkbookContext.prototype, "isPDF", {
        get: function () {
            return this.props.file.isPDF;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkbookContext.prototype, "pdf", {
        get: function () {
            return this.props.file.pdf;
        },
        enumerable: true,
        configurable: true
    });
    WorkbookContext.prototype.initialize = function (file) {
        var _this = this;
        if (!file) {
            return null;
        }
        if (file.isPDF) {
            this.setState({ workbookState: constants_1.WorkbookState.Rendering });
            file.pdf.page(1, function (pageNumber, size, dataURL) {
                var workbook = new workbook_1.default(file.pdf.pageCount);
                _this.setState({
                    workbookState: constants_1.WorkbookState.Ready,
                    type: constants_1.FileType.PDF,
                    pageCount: file.pdf.pageCount,
                    pageNumber: pageNumber,
                    dataURL: dataURL,
                    size: size,
                    workbook: workbook,
                    page: workbook.page(1)
                });
            });
        }
        else {
            var workbook = new workbook_1.default(1);
            this.setState({
                workbookState: constants_1.WorkbookState.Ready,
                type: constants_1.FileType.Image,
                pageCount: 1,
                pageNumber: 1,
                dataURL: file.dataURL,
                workbook: workbook,
                size: { width: file.width, height: file.height },
                page: workbook.page(1)
            });
        }
    };
    WorkbookContext.prototype.page = function (pageNumber) {
        var _this = this;
        this.setState({ workbookState: constants_1.WorkbookState.Rendering });
        this.pdf.page(pageNumber, function (pageNumber, size, dataURL) { return _this.setState({
            workbookState: constants_1.WorkbookState.Ready,
            pageNumber: pageNumber,
            dataURL: dataURL,
            page: _this.state.workbook.page(pageNumber)
        }); });
    };
    return WorkbookContext;
}(parcel_1.Parcel));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkbookContext;
//# sourceMappingURL=workbook-context.js.map