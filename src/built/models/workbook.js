"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var id_man_1 = require("./id-man");
var page_1 = require("./page");
var _ = require("lodash");
var workbook_record_1 = require("../records/workbook-record");
var Workbook = (function (_super) {
    __extends(Workbook, _super);
    function Workbook(key, pageCount, isPDF) {
        var _this = this;
        if (isPDF === void 0) { isPDF = false; }
        _super.call(this);
        this.key = key;
        this.pageCount = pageCount;
        this.isPDF = isPDF;
        this.pageNumber = 1;
        this.pages = _.times(pageCount, function () { return new page_1.default(); });
        var stored = new workbook_record_1.default(key).read('workbook');
        if (stored) {
            this.pages = stored.pages.map(function (pageData) {
                return page_1.default.fromJSON(pageData);
            });
            if (this.page.length < pageCount) {
                _.times(pageCount - this.page.length, function () { return _this.pages.push(new page_1.default()); });
            }
        }
        else {
            this.pages = _.times(pageCount, function () { return new page_1.default(); });
        }
    }
    Object.defineProperty(Workbook.prototype, "currentPage", {
        get: function () {
            return this.pages[this.pageNumber - 1];
        },
        enumerable: true,
        configurable: true
    });
    Workbook.prototype.page = function (n) {
        this.pageNumber = n;
        this.currentPage.update();
        this.currentPage.updateMarker();
        return this.currentPage;
    };
    Object.defineProperty(Workbook.prototype, "forJSON", {
        get: function () {
            return {
                pages: this.pages.map(function (page) { return page.forJSON; })
            };
        },
        enumerable: true,
        configurable: true
    });
    return Workbook;
}(id_man_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Workbook;
//# sourceMappingURL=workbook.js.map