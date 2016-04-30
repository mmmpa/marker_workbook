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
            mode: constants_1.ToolMode.DrawingMark,
            thickness: 40,
            sheetVisibility: true,
            workbook: null,
            scale: 1
        });
        this.initializeShortCut(this.props.keyControl);
        this.componentWillReceiveProps(this.props);
    };
    WorkbookContext.prototype.initializeShortCut = function (keyControl) {
        var _this = this;
        keyControl.bind('onArrowLeft', 'pdf:back', function () { return _this.pageNext(-1); });
        keyControl.bind('onArrowRight', 'pdf:next', function () { return _this.pageNext(+1); });
        keyControl.bind('onV', 'sheet:toggle', function () {
            _this.dispatch('sheet:display', !_this.state.sheetVisibility);
        });
    };
    WorkbookContext.prototype.pageNext = function (n) {
        if (!this.state.workbook.isPDF) {
            return;
        }
        var pageNumber = this.state.workbook.pageNumber;
        this.dispatch('pdf:page', pageNumber + n);
    };
    WorkbookContext.prototype.componentWillReceiveProps = function (props) {
        if (this.props.file !== props.file) {
            this.initialize(props.file);
        }
    };
    WorkbookContext.prototype.listen = function (to) {
        var _this = this;
        to(null, 'tool:change:slide:paper', function () { return _this.setState({ mode: constants_1.ToolMode.SlidingPaper }); });
        to(null, 'tool:change:slide:sheet', function () { return _this.setState({ mode: constants_1.ToolMode.SlidingSheet }); });
        to(null, 'tool:change:draw:Marker', function () { return _this.setState({ mode: constants_1.ToolMode.DrawingMark }); });
        to(null, 'tool:change:delete:marker', function () { return _this.setState({ mode: constants_1.ToolMode.DeletingMark }); });
        to(null, 'tool:thickness', function (thickness) { return _this.setState({ thickness: thickness }); });
        to(null, 'sheet:display', function (sheetVisibility) { return _this.setState({ sheetVisibility: sheetVisibility }); });
        to(null, 'marker:click', function (marker, isRight) { return _this.selectMarker(marker, isRight); });
        to(null, 'pdf:page', function (nextPageNumber) { return _this.page({ nextPageNumber: nextPageNumber }); });
        to(null, 'workbook:scale', function (nextScale) { return _this.page({ nextScale: nextScale }); });
        to(null, 'workbook:position:reset', function (scale) { return _this.resetPosition(); });
        to(null, 'workbook:save', function () {
            _this.dispatch('workbook:save:json', _this.state.workbook.forJSON);
        });
    };
    WorkbookContext.prototype.resetPosition = function () {
        this.state.workbook.currentPage.resetPosition();
        this.setState({});
        this.dispatch('workbook:save');
    };
    WorkbookContext.prototype.selectMarker = function (marker, isRight) {
        var keyControl = this.props.keyControl;
        var mode = this.state.mode;
        if (keyControl.isDown('Space')) {
            return;
        }
        if (mode !== constants_1.ToolMode.DrawingMark && mode !== constants_1.ToolMode.DeletingMark) {
            return;
        }
        if (mode === constants_1.ToolMode.DrawingMark && !isRight) {
            return;
        }
        if (mode === constants_1.ToolMode.DeletingMark && isRight) {
            return;
        }
        this.state.workbook.currentPage.removeMarker(marker);
        this.setState({});
        this.dispatch('workbook:save');
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
            file.pdf.page(1, this.state.scale, function (pageNumber, size, dataURL) {
                var workbook = new workbook_1.default(file.key, file.pdf.pageCount, true);
                _this.setState({
                    workbookState: constants_1.WorkbookState.Ready,
                    type: constants_1.FileType.PDF,
                    dataURL: dataURL,
                    size: size,
                    workbook: workbook
                });
            });
        }
        else {
            var workbook = new workbook_1.default(file.key, 1);
            this.setState({
                workbookState: constants_1.WorkbookState.Ready,
                type: constants_1.FileType.Image,
                dataURL: file.dataURL,
                workbook: workbook,
                size: { width: file.width, height: file.height }
            });
        }
    };
    WorkbookContext.prototype.page = function (_a) {
        var _this = this;
        var nextPageNumber = _a.nextPageNumber, nextScale = _a.nextScale;
        var pageNumber = nextPageNumber || this.state.workbook.pageNumber;
        var scale = nextScale || this.state.scale;
        this.setState({ workbookState: constants_1.WorkbookState.Rendering });
        this.pdf.page(pageNumber, scale, function (pageNumber, size, dataURL) {
            _this.state.workbook.page(pageNumber);
            _this.setState({
                workbookState: constants_1.WorkbookState.Ready,
                dataURL: dataURL,
                scale: scale,
                size: size
            });
        });
    };
    return WorkbookContext;
}(parcel_1.Parcel));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkbookContext;
//# sourceMappingURL=workbook-context.js.map