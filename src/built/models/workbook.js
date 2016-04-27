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
    function Workbook(key, pageCount) {
        _super.call(this);
        this.key = key;
        this.pageCount = pageCount;
        this.pages = _.times(pageCount, function () { return new page_1.default(); });
        var stored = new workbook_record_1.default(key).read('workbook');
        if (stored) {
            console.log(stored);
        }
    }
    Workbook.prototype.page = function (n) {
        return this.pages[n - 1];
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