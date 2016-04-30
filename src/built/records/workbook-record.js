"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var plate_1 = require("../libs/plate");
var WorkbookRecord = (function (_super) {
    __extends(WorkbookRecord, _super);
    function WorkbookRecord(key) {
        _super.call(this, 'workbook' + key);
    }
    return WorkbookRecord;
}(plate_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkbookRecord;
//# sourceMappingURL=workbook-record.js.map