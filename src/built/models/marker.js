"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var id_man_1 = require("./id-man");
var Marker = (function (_super) {
    __extends(Marker, _super);
    function Marker(x, y, length, thickness, rotation) {
        _super.call(this);
        this.x = x;
        this.y = y;
        this.length = length;
        this.thickness = thickness;
        this.rotation = rotation;
    }
    Marker.prototype.getEnd = function () {
        var _a = this, x = _a.x, y = _a.y, radian = _a.radian, length = _a.length;
        var endX = x + Math.cos(radian) * length;
        var endY = y + Math.sin(radian) * length;
        return { endX: endX, endY: endY };
    };
    Object.defineProperty(Marker.prototype, "css", {
        get: function () {
            var _a = this, x = _a.x, y = _a.y, rotation = _a.rotation, length = _a.length, thickness = _a.thickness;
            return {
                left: x,
                top: y,
                width: length,
                height: thickness,
                transform: "rotate(" + rotation + "deg)"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Marker.prototype, "radian", {
        get: function () {
            return this.rotation * Math.PI / 180;
        },
        enumerable: true,
        configurable: true
    });
    return Marker;
}(id_man_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Marker;
//# sourceMappingURL=marker.js.map