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
    WorkbookComponent.prototype.componentWillMount = function () {
        this.setState({});
        this.componentWillReceiveProps(this.props);
    };
    WorkbookComponent.prototype.componentWillReceiveProps = function (props) {
        if (this.props.file !== props.file) {
            this.initialize(props.file);
        }
    };
    WorkbookComponent.prototype.initialize = function (file) {
        var _this = this;
        if (!file) {
            return null;
        }
        if (file.type === constants_1.FileType.PDF) {
            file.pdf.page(1, function (dataURL) { return _this.setState({ page: 1, file: file, dataURL: dataURL }); });
        }
        else {
            this.setState({ dataURL: file.dataURL });
        }
    };
    WorkbookComponent.prototype.page = function (page) {
        var _this = this;
        this.setState({ page: page });
        this.state.file.pdf.page(page, function (dataURL) { return _this.setState({ dataURL: dataURL }); });
    };
    WorkbookComponent.prototype.render = function () {
        var _this = this;
        return React.createElement("div", null, React.createElement("input", {type: "number", value: this.state.page, onChange: function (e) { return _this.page(+e.target.value); }}), " ", React.createElement("img", {src: this.state.dataURL}));
    };
    return WorkbookComponent;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkbookComponent;
//# sourceMappingURL=workbook-component.js.map