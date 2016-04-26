"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var marker_1 = require("./marker");
var id_man_1 = require("./id-man");
var Page = (function (_super) {
    __extends(Page, _super);
    function Page() {
        _super.call(this);
        this.pagePosition = { x: 0, y: 0 };
        this.sheetPosition = { x: 0, y: 0 };
        this.markers = [new marker_1.default(0, 0, 100, 40, 0)];
        this.version = 0;
    }
    Page.prototype.moveSheet = function (moveX, moveY) {
        this.sheetPosition.x += moveX;
        this.sheetPosition.y += moveY;
    };
    Page.prototype.movePage = function (moveX, moveY) {
        this.pagePosition.x += moveX;
        this.pagePosition.y += moveY;
    };
    return Page;
}(id_man_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Page;
//# sourceMappingURL=page.js.map