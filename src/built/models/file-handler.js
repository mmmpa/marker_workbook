"use strict";
var changeCase = require('change-case');
var constants_1 = require("../constants/constants");
var pdf_handler_1 = require("./pdf-handler");
PDFJS.workerSrc = './js/pdf.worker.js';
PDFJS.cMapUrl = "./cmaps/";
PDFJS.cMapPacked = true;
var FileHandler = (function () {
    function FileHandler(callback, fileName) {
        var _this = this;
        if (fileName === void 0) { fileName = null; }
        this.callback = callback;
        if (fileName) {
            this.file = new File([''], fileName);
            this.type = this.detectFileType(this.file.name);
            if (this.type === constants_1.FileType.PDF) {
                PDFJS.getDocument(fileName).then(function (pdf) {
                    _this.pdf = new pdf_handler_1.default(pdf);
                    _this.callback(_this);
                });
            }
            else {
            }
        }
    }
    FileHandler.prototype.getExtension = function (fileName) {
        var ex = fileName.replace(/\?.*/, '').replace(/#.*/, '').replace(/.*\./, '');
        return changeCase.lowerCase(ex);
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
            return [this.name, this.file.size, this.file.type || this.type].join('_');
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
    Object.defineProperty(FileHandler.prototype, "inputHandler", {
        get: function () {
            var _this = this;
            return function (e) {
                _this.handleFile(e.target.files[0]);
            };
        },
        enumerable: true,
        configurable: true
    });
    FileHandler.prototype.handleFile = function (file) {
        this.file = file;
        var reader = new FileReader();
        this.type = this.detectFileType(file.name);
        if (this.type === constants_1.FileType.PDF) {
            reader.addEventListener('load', this.pdfReader);
            reader.readAsArrayBuffer(file);
        }
        else {
            reader.addEventListener('load', this.imageReader);
            reader.readAsDataURL(file);
        }
    };
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