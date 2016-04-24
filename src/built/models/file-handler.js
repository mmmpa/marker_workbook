"use strict";
var changeCase = require('change-case');
var constants_1 = require("../constants/constants");
var FileHandler = (function () {
    function FileHandler(callback) {
        this.callback = callback;
    }
    FileHandler.prototype.getExtension = function (fileName) {
        return changeCase.lowerCase(fileName.split('.').pop());
    };
    FileHandler.prototype.detectFileType = function (fileName) {
        switch (this.getExtension(fileName)) {
            case 'pdf':
                return constants_1.FileType.PDF;
            default:
                return constants_1.FileType.Image;
        }
    };
    Object.defineProperty(FileHandler.prototype, "handler", {
        get: function () {
            var _this = this;
            return function (e) {
                var file = e.path[0].files[0];
                var reader = new FileReader();
                _this.type = _this.detectFileType(file.name);
                if (_this.type === constants_1.FileType.PDF) {
                }
                else {
                    reader.addEventListener('load', _this.imageReader);
                    reader.readAsDataURL(file);
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileHandler.prototype, "imageReader", {
        get: function () {
            var _this = this;
            return function (e) {
                _this.dataURL = e.target.result;
                _this.callback(_this);
            };
        },
        enumerable: true,
        configurable: true
    });
    return FileHandler;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileHandler;
//# sourceMappingURL=file-handler.js.map