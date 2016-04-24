"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var parcel_1 = require("../libs/parcel");
var file_handler_1 = require("../models/file-handler");
var FileSelectorComponent = (function (_super) {
    __extends(FileSelectorComponent, _super);
    function FileSelectorComponent() {
        _super.apply(this, arguments);
    }
    FileSelectorComponent.prototype.open = function () {
        var _this = this;
        var fileHandler = new file_handler_1.default(function (file) { return _this.dispatch('file:set', file); });
        var $fileListener = $('<input type="file"/>');
        $fileListener.bind('change', fileHandler.handler);
        $fileListener.trigger('click');
    };
    FileSelectorComponent.prototype.render = function () {
        var _this = this;
        return React.createElement("div", null, React.createElement("button", {className: "open", onClick: function () { return _this.open(); }}, "open"));
    };
    return FileSelectorComponent;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileSelectorComponent;
//# sourceMappingURL=file-selector-component.js.map