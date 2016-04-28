"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var parcel_1 = require("../libs/parcel");
var fa_1 = require("../libs/fa");
var FileSelectorComponent = (function (_super) {
    __extends(FileSelectorComponent, _super);
    function FileSelectorComponent() {
        _super.apply(this, arguments);
    }
    FileSelectorComponent.prototype.open = function (e) {
        e.target.blur();
        this.dispatch('file:open');
    };
    FileSelectorComponent.prototype.render = function () {
        var _this = this;
        return React.createElement("div", {className: "file-selector-component"}, React.createElement("button", {className: "icon-button open", onClick: function (e) { return _this.open(e); }}, React.createElement("div", null, React.createElement(fa_1.default, {icon: "folder-open-o"})), React.createElement("p", null, "ファイルを開く")), React.createElement("div", {className: "information"}, React.createElement(FileInformationComponent, React.__spread({}, { file: this.props.file }))));
    };
    return FileSelectorComponent;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileSelectorComponent;
var FileInformationComponent = (function (_super) {
    __extends(FileInformationComponent, _super);
    function FileInformationComponent() {
        _super.apply(this, arguments);
    }
    FileInformationComponent.prototype.render = function () {
        if (!this.props.file) {
            return null;
        }
        return React.createElement("div", {className: "file-information"}, React.createElement("section", {className: "file-name"}, "name:", this.props.file.name), React.createElement("section", {className: "file-key"}, "key:", this.props.file.key, "（localStorage保存時に使用）"));
    };
    return FileInformationComponent;
}(React.Component));
//# sourceMappingURL=file-selector-component.js.map