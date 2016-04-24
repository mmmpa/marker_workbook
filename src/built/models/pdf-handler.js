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
    PDFHandler.prototype.page = function (n, callback) {
        var _this = this;
        if (!!this.pageStore[n]) {
            return callback(this.pageStore[n]);
        }
        this.pdf.getPage(n).then(function (page) {
            var viewport = page.getViewport(2);
            var _a = _this.setupCanvas(viewport), canvas = _a.canvas, canvasContext = _a.canvasContext;
            page.render({ canvasContext: canvasContext, viewport: viewport }).promise.then(function () {
                _this.pageStore[n] = canvas.toDataURL();
                callback(canvas.toDataURL());
            });
        });
    };
    return PDFHandler;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PDFHandler;
//# sourceMappingURL=pdf-handler.js.map