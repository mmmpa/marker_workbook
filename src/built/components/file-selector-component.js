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
            file: this.props.file
        });
    };
    FileSelectorComponent.prototype.componentDidMount = function () {
    };
    FileSelectorComponent.prototype.writeDisplay = function (file) {
        if (!file) {
            return null;
        }
        if (file.type === constants_1.FileType.PDF) {
        }
        else {
            return React.createElement("img", {src: file.dataURL});
        }
    };
    FileSelectorComponent.prototype.open = function () {
        var _this = this;
        var fileHandler = new file_handler_1.default(function (file) { return _this.setState({ file: file }); });
        var $fileListener = $('<input type="file"/>');
        $fileListener.on('change', fileHandler.handler);
        $fileListener.trigger('click');
    };
    FileSelectorComponent.prototype.render = function () {
        var _this = this;
        return React.createElement("div", null, React.createElement("button", {className: "open", onClick: function () { return _this.open(); }}, "open"), this.writeDisplay(this.state.file));
    };
    return FileSelectorComponent;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileSelectorComponent;
//# sourceMappingURL=file-selector-component.js.map