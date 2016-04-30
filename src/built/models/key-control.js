"use strict";
var KeyControl = (function () {
    function KeyControl(_a) {
        var killer = (_a === void 0 ? {} : _a).killer;
        this.downStore = {};
        this.binding = {};
        this.onDown = this.onDown.bind(this);
        this.onUp = this.onUp.bind(this);
        $(window).bind('keydown', this.onDown);
        $(window).bind('keyup', this.onUp);
        this.killer = killer || {};
    }
    KeyControl.prototype.bind = function (keyName, callbackName, callback) {
        if (!this.binding[keyName]) {
            this.binding[keyName] = {};
        }
        this.binding[keyName][callbackName] = callback;
    };
    KeyControl.prototype.unbind = function (keyName, callbackName) {
        this.binding[keyName][callbackName] = null;
    };
    KeyControl.prototype.dispose = function () {
        $(window).unbind('keydown', this.onDown);
        $(window).unbind('keyup', this.onUp);
    };
    KeyControl.prototype.onDown = function (e) {
        this.down(e.code);
        this.down(e.keyIdentifier);
        this.check(e);
    };
    KeyControl.prototype.onUp = function (e) {
        this.up(e.code);
        this.up(e.keyIdentifier);
        this.strike(null, e);
    };
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
        if (this.killer && this.killer[name]) {
            e.preventDefault();
        }
        this.hook && this.hook(name, e);
        if (this.binding[name]) {
            for (var k in this.binding[name]) {
                this.binding[name][k](e);
            }
        }
    };
    return KeyControl;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = KeyControl;
//# sourceMappingURL=key-control.js.map