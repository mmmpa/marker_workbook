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
    Marker.prototype.to = function (x, y) {
        var moveX = x - this.x;
        var moveY = y - this.y;
        this.rotation = Math.atan2(moveY, moveX) * 180 / Math.PI;
        this.length = Math.sqrt(moveX * moveX + moveY * moveY);
    };
    Object.defineProperty(Marker.prototype, "wrapperCSS", {
        get: function () {
            var _a = this, x = _a.x, y = _a.y, rotation = _a.rotation, length = _a.length, thickness = _a.thickness;
            return {
                left: x,
                top: y - this.thickness / 2,
                transform: "rotate(" + rotation + "deg)"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Marker.prototype, "innerCSS", {
        get: function () {
            var _a = this, x = _a.x, y = _a.y, rotation = _a.rotation, length = _a.length, thickness = _a.thickness;
            return {
                width: length,
                height: thickness
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
    Object.defineProperty(Marker.prototype, "forJSON", {
        get: function () {
            var _a = this, x = _a.x, y = _a.y, length = _a.length, rotation = _a.rotation, thickness = _a.thickness;
            return { x: x, y: y, length: length, rotation: rotation, thickness: thickness };
        },
        enumerable: true,
        configurable: true
    });
    Marker.fromJSON = function (data) {
        var x = data.x, y = data.y, length = data.length, thickness = data.thickness, rotation = data.rotation;
        return new Marker(x, y, length, thickness, rotation);
    };
    return Marker;
}(id_man_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Marker;
//# sourceMappingURL=marker.js.map