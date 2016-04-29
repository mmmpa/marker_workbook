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
        this.markers = [];
        this.version = 0;
    }
    Page.prototype.update = function () {
        this.version++;
    };
    Page.prototype.resetPosition = function () {
        this.pagePosition = { x: 0, y: 0 };
        this.sheetPosition = { x: 0, y: 0 };
        this.update();
    };
    Page.prototype.newMarker = function (x, y, thickness, length, rotation) {
        if (thickness === void 0) { thickness = 40; }
        if (length === void 0) { length = 0; }
        if (rotation === void 0) { rotation = 0; }
        var newMarker = new marker_1.default(x, y, 0, thickness, 0);
        this.markers.push(newMarker);
        return newMarker;
    };
    Page.prototype.removeMarker = function (marker) {
        this.markers = _.filter(this.markers, function (m) { return m.id !== marker.id; });
        this.update();
    };
    Page.prototype.moveSheet = function (moveX, moveY) {
        this.sheetPosition.x += moveX;
        this.sheetPosition.y += moveY;
    };
    Page.prototype.movePage = function (moveX, moveY) {
        this.pagePosition.x += moveX;
        this.pagePosition.y += moveY;
    };
    Object.defineProperty(Page.prototype, "forJSON", {
        get: function () {
            var _a = this, pagePosition = _a.pagePosition, sheetPosition = _a.sheetPosition, markers = _a.markers;
            return {
                pagePosition: pagePosition,
                sheetPosition: sheetPosition,
                markers: markers.map(function (marker) { return marker.forJSON; })
            };
        },
        enumerable: true,
        configurable: true
    });
    Page.fromJSON = function (data) {
        var page = new Page();
        page.pagePosition = data.pagePosition;
        page.sheetPosition = data.sheetPosition;
        page.markers = data.markers.map(function (markerData) { return marker_1.default.fromJSON(markerData); });
        return page;
    };
    return Page;
}(id_man_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Page;
//# sourceMappingURL=page.js.map