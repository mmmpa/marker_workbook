"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require("../libs/parcel");
var constants_1 = require("../constants/constants");
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
            pageCount: 0
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
            file.pdf.page(1, function (pageNumber, dataURL) { return _this.setState({
                workbookState: constants_1.WorkbookState.Ready,
                type: constants_1.FileType.PDF,
                pageCount: file.pdf.pageCount,
                pageNumber: pageNumber,
                dataURL: dataURL
            }); });
        }
        else {
            this.setState({
                workbookState: constants_1.WorkbookState.Ready,
                type: constants_1.FileType.Image,
                pageCount: 0,
                pageNumber: 0,
                dataURL: file.dataURL
            });
        }
    };
    WorkbookContext.prototype.page = function (pageNumber) {
        var _this = this;
        this.setState({ workbookState: constants_1.WorkbookState.Rendering });
        this.pdf.page(pageNumber, function (pageNumber, dataURL) { return _this.setState({
            workbookState: constants_1.WorkbookState.Ready,
            pageNumber: pageNumber,
            dataURL: dataURL
        }); });
    };
    return WorkbookContext;
}(parcel_1.Parcel));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkbookContext;
//# sourceMappingURL=workbook-context.js.map