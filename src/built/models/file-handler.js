"use strict";
var changeCase = require('change-case');
var constants_1 = require("../constants/constants");
var pdf_handler_1 = require("./pdf-handler");
PDFJS.workerSrc = './js/pdf.worker.js';
PDFJS.cMapUrl = "./cmaps/";
PDFJS.cMapPacked = true;
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
    Object.defineProperty(FileHandler.prototype, "name", {
        get: function () {
            return this.file.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileHandler.prototype, "key", {
        get: function () {
            return [this.name, this.file.size, this.file.type].join('_');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileHandler.prototype, "isPDF", {
        get: function () {
            return !!this.pdf;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileHandler.prototype, "handler", {
        get: function () {
            var _this = this;
            return function (e) {
                _this.file = e.target.files[0];
                var reader = new FileReader();
                _this.type = _this.detectFileType(_this.file.name);
                if (_this.type === constants_1.FileType.PDF) {
                    reader.addEventListener('load', _this.pdfReader);
                    reader.readAsArrayBuffer(_this.file);
                }
                else {
                    reader.addEventListener('load', _this.imageReader);
                    reader.readAsDataURL(_this.file);
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileHandler.prototype, "pdfReader", {
        get: function () {
            var _this = this;
            return function (e) {
                var typedArray = new Uint8Array(e.target.result);
                PDFJS.getDocument(typedArray).then(function (pdf) {
                    _this.pdf = new pdf_handler_1.default(pdf);
                    _this.callback(_this);
                });
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
                var img = new Image();
                img.addEventListener('load', function (_a) {
                    var target = _a.target;
                    _this.width = target.width;
                    _this.height = target.height;
                    _this.callback(_this);
                });
                img.src = _this.dataURL;
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