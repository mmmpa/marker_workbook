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
    WorkbookComponent.prototype.onMouseDown = function (e) {
        var _this = this;
        e.preventDefault();
        var _a = this.mousePosition(e), x = _a.x, y = _a.y;
        var isRight = e.nativeEvent.which === 3;
        this.setShortCut(function () { return _this.detectPressAction(isRight)(x, y); });
    };
    WorkbookComponent.prototype.setShortCut = function (callback) {
        switch (true) {
            case this.props.keyControl.isDown('Space'):
                return this.setState({ shortCut: constants_1.ShortCut.Slide }, callback);
            default:
                return this.setState({ shortCut: null }, callback);
        }
    };
    WorkbookComponent.prototype.detectPressAction = function (isRight) {
        var _this = this;
        if (isRight === void 0) { isRight = false; }
        switch (true) {
            case this.props.keyControl.isDown('Space'):
                return function (x, y) { return _this.startDrag(x, y, isRight); };
            default:
                return function (x, y) { return _this.startDrawMarker(x, y); };
        }
    };
    WorkbookComponent.prototype.startDrawMarker = function (startX, startY) {
        var _this = this;
        var offsetX = -this.props.page.pagePosition.x;
        var offsetY = -this.props.page.pagePosition.y;
        var marker = this.props.page.newMarker(startX + offsetX, startY + offsetY);
        var move = function (e) {
            var _a = _this.mousePosition(e), x = _a.x, y = _a.y;
            marker.to(x + offsetX, y + offsetY);
            _this.props.page.update();
            _this.setState({});
        };
        var clear = function () {
            $(window).off('mouseup', clear);
            $(window).off('mousemove', move);
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
        };
        $(window).on('mousemove', move);
        $(window).on('mouseup', clear);
    };
    WorkbookComponent.prototype.detectDragAction = function (isRight) {
        var _this = this;
        if (isRight === void 0) { isRight = false; }
        switch (true) {
            case this.state.shortCut === constants_1.ShortCut.Slide:
                return isRight
                    ? function (startX, startY, x, y, endX, endY) { return _this.slideSheet(x, y, endX, endY); }
                    : function (startX, startY, x, y, endX, endY) { return _this.slidePage(x, y, endX, endY); };
            default:
                return function (startX, startY, x, y, endX, endY) { return _this.drawMarker(startX, startY, endX, endY, _this.rightColor); };
        }
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
        var x = e.pageX - this.workspace.offsetLeft;
        var y = e.pageY - this.workspace.offsetTop;
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
            return React.createElement("div", null, "ロードされていません。");
        }
        return React.createElement("div", {className: "workbook-component", ref: "workspace"}, React.createElement("div", {className: "workbook-controller"}, React.createElement(WorkbookToolComponent, React.__spread({}, this.relayingProps())), this.writeController()), React.createElement("div", {className: "workbook-container", onMouseDown: function (e) { return _this.onMouseDown(e); }, onContextMenu: function (e) { return e.preventDefault(); }}, React.createElement(WorkbookViewerComponent, React.__spread({}, this.relayingProps()))));
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
        var _a = this.props, dataURL = _a.dataURL, page = _a.page, size = _a.size;
        if (!page) {
            return null;
        }
        var _b = page.pagePosition, x = _b.x, y = _b.y;
        return React.createElement("div", {className: "viewer-area"}, React.createElement("div", {className: "workbook-area", style: { left: x, top: y }}, React.createElement("div", {className: "marker-area"}, React.createElement(MarkerComponent, React.__spread({}, { page: page })), React.createElement(SheetComponent, React.__spread({}, { page: page, size: size }))), React.createElement("img", {src: dataURL})));
    };
    return WorkbookViewerComponent;
}(parcel_1.Good));
var SheetComponent = (function (_super) {
    __extends(SheetComponent, _super);
    function SheetComponent() {
        _super.apply(this, arguments);
    }
    SheetComponent.prototype.render = function () {
        var _a = this.props, page = _a.page, size = _a.size;
        var width = size.width, height = size.height;
        var _b = page.sheetPosition, x = _b.x, y = _b.y;
        return React.createElement("div", {className: "sheet-area", style: { left: x, top: y, width: width, height: height }}, React.createElement("div", {className: "sheet"}), React.createElement("div", {className: "markers", style: { left: -x, top: -y }}, React.createElement(MarkerComponent, React.__spread({}, { page: page }))));
    };
    return SheetComponent;
}(React.Component));
var MarkerComponent = (function (_super) {
    __extends(MarkerComponent, _super);
    function MarkerComponent() {
        _super.apply(this, arguments);
    }
    MarkerComponent.prototype.componentWillMount = function () {
        this.componentWillReceiveProps(this.props);
    };
    MarkerComponent.prototype.shouldComponentUpdate = function (props, _) {
        return this.state.version !== props.page.version;
    };
    MarkerComponent.prototype.componentWillReceiveProps = function (props) {
        this.setState({ version: props.page.version });
    };
    MarkerComponent.prototype.writeMarkers = function () {
        var markers = this.props.page.markers;
        return markers.map(function (marker) {
            return React.createElement("div", {className: "marker", style: marker.wrapperCSS}, React.createElement("div", {className: "marker-draw", style: marker.innerCSS}, "marker"));
        });
    };
    MarkerComponent.prototype.render = function () {
        return React.createElement("div", {className: "marker-area"}, this.writeMarkers());
    };
    return MarkerComponent;
}(React.Component));
//# sourceMappingURL=workbook-component.js.map