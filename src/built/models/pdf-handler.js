"use strict";
var PDFHandler = (function () {
    function PDFHandler(pdf) {
        this.pdf = pdf;
        this.pageStore = [];
    }
    PDFHandler.prototype.setupCanvas = function (viewport) {
        var canvas = document.createElement('canvas');
        var canvasContext = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        return { canvas: canvas, canvasContext: canvasContext };
    };
    Object.defineProperty(PDFHandler.prototype, "pageCount", {
        get: function () {
            return this.pdf.numPages;
        },
        enumerable: true,
        configurable: true
    });
    PDFHandler.prototype.store = function (pageNumber, scale, dataURL, viewport) {
        var width = viewport.width, height = viewport.height;
        if (!this.pageStore[pageNumber]) {
            this.pageStore[pageNumber] = [];
        }
        this.pageStore[pageNumber][scale] = { dataURL: dataURL, size: { width: width, height: height } };
    };
    PDFHandler.prototype.pick = function (pageNumber, scale) {
        if (!this.pageStore[pageNumber]) {
            return null;
        }
        return this.pageStore[pageNumber][scale];
    };
    PDFHandler.prototype.page = function (n, scale, callback) {
        var _this = this;
        var pageNumber = n;
        if (n < 1) {
            pageNumber = 1;
        }
        else if (n > this.pageCount) {
            pageNumber = this.pageCount;
        }
        var stored = this.pick(pageNumber, scale);
        if (!!stored) {
            return callback(pageNumber, stored.size, stored.dataURL);
        }
        this.pdf.getPage(pageNumber).then(function (page) {
            var viewport = page.getViewport(scale);
            var _a = _this.setupCanvas(viewport), canvas = _a.canvas, canvasContext = _a.canvasContext;
            page.render({ canvasContext: canvasContext, viewport: viewport }).promise.then(function () {
                var dataURL = canvas.toDataURL();
                _this.store(pageNumber, scale, dataURL, viewport);
                callback(pageNumber, { width: viewport.width, height: viewport.height }, dataURL);
            });
        });
    };
    return PDFHandler;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PDFHandler;
//# sourceMappingURL=pdf-handler.js.map