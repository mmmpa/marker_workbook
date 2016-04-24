"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var parcel_1 = require("../libs/parcel");
var file_handler_1 = require("../models/file-handler");
var constants_1 = require("../constants/constants");
var FileSelectorComponent = (function (_super) {
    __extends(FileSelectorComponent, _super);
    function FileSelectorComponent() {
        _super.apply(this, arguments);
    }
    FileSelectorComponent.prototype.componentWillMount = function () {
        this.setState({
            file: this.props.file,
            page: 1,
            dataURL: null
        });
    };
    FileSelectorComponent.prototype.componentDidMount = function () {
    };
    FileSelectorComponent.prototype.writeDisplay = function (file) {
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
    FileSelectorComponent.prototype.page = function (page) {
        var _this = this;
        this.setState({ page: page });
        this.state.file.pdf.page(page, function (dataURL) { return _this.setState({ dataURL: dataURL }); });
    };
    FileSelectorComponent.prototype.open = function () {
        var _this = this;
        var fileHandler = new file_handler_1.default(function (file) { return _this.writeDisplay(file); });
        var $fileListener = $('<input type="file"/>');
        $fileListener.on('change', fileHandler.handler);
        $fileListener.trigger('click');
    };
    FileSelectorComponent.prototype.render = function () {
        var _this = this;
        return React.createElement("div", null, React.createElement("input", {type: "number", value: this.state.page, onChange: function (e) { return _this.page(+e.target.value); }}), React.createElement("button", {className: "open", onClick: function () { return _this.open(); }}, "open"), React.createElement("img", {src: this.state.dataURL}));
    };
    return FileSelectorComponent;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileSelectorComponent;
//# sourceMappingURL=file-selector-component.js.map