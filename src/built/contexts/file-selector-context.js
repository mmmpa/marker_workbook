"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require("../libs/parcel");
var file_handler_1 = require("../models/file-handler");
var FileSelectorContext = (function (_super) {
    __extends(FileSelectorContext, _super);
    function FileSelectorContext() {
        _super.apply(this, arguments);
    }
    FileSelectorContext.prototype.componentWillReceiveProps = function (props) {
        console.log('selector', props);
    };
    FileSelectorContext.prototype.listen = function (to) {
        var _this = this;
        to(null, 'file:open', function (file) { return _this.open(); });
    };
    FileSelectorContext.prototype.open = function () {
        var _this = this;
        this.dispatch('file:open:start');
        var fileHandler = new file_handler_1.default(function (file) { return _this.dispatch('file:set', file); });
        var $fileListener = $('<input type="file"/>');
        $fileListener.bind('change', fileHandler.handler);
        $fileListener.trigger('click');
    };
    return FileSelectorContext;
}(parcel_1.Parcel));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileSelectorContext;
//# sourceMappingURL=file-selector-context.js.map