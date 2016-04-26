"use strict";
var KeyControl = (function () {
    function KeyControl() {
        var _this = this;
        this.downStore = {};
        $(window).keydown(function (e) {
            _this.down(e.code);
            _this.down(e.keyIdentifier);
            _this.check(e);
        });
        $(window).keyup(function (e) {
            _this.up(e.code);
            _this.up(e.keyIdentifier);
            _this.strike(null, e);
        });
    }
    KeyControl.prototype.down = function (code) {
        this.downStore[code] = true;
    };
    KeyControl.prototype.up = function (code) {
        this.downStore[code] = false;
    };
    KeyControl.prototype.isDown = function (code) {
        return this.downStore[code];
    };
    KeyControl.prototype.check = function (e) {
        var string = 'on';
        if (e.altKey) {
            string += 'Alt';
        }
        if (e.ctrlKey) {
            string += 'Control';
        }
        if (e.shiftKey) {
            string += 'Shift';
        }
        string += e.code.replace('Key', '');
        this.strike(string, e);
    };
    KeyControl.prototype.strike = function (name, e) {
        this.hook && this.hook(name, e);
    };
    return KeyControl;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = KeyControl;
//# sourceMappingURL=key-control.js.map