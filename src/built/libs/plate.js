"use strict";
var _ = require('lodash');
var Plate = (function () {
    function Plate(_name) {
        this._name = _name;
        this._initialize();
    }
    Plate.prototype._initialize = function () {
        var raw = window.localStorage.getItem(this._name);
        this._raw = raw ? JSON.parse(raw) : {};
    };
    Plate.prototype.reload = function () {
        this._initialize();
    };
    Plate.prototype.save = function () {
        window.localStorage.setItem(this._name, JSON.stringify(this._raw));
    };
    Plate.prototype.read = function (key) {
        if (this['get_' + key]) {
            return this['get_' + key]();
        }
        else {
            return this.readRaw(key);
        }
    };
    Plate.prototype.readRaw = function (key) {
        return this._raw[key];
    };
    Plate.prototype.write = function (key, value, save) {
        if (save === void 0) { save = true; }
        if (this['set_' + key]) {
            this['set_' + key](value);
        }
        else {
            this.writeRaw(key, value, save);
        }
    };
    Plate.prototype.writeRaw = function (key, value, save) {
        if (save === void 0) { save = true; }
        this._raw[key] = value;
        save && this.save();
    };
    Plate.prototype.writeOnce = function (keyValue) {
        var _this = this;
        _.forEach(keyValue, function (v, k) {
            _this.write(k, v, false);
        });
        this.save();
    };
    Plate.prototype.readOnce = function () {
        var _this = this;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i - 0] = arguments[_i];
        }
        return _.reduce(keys, function (a, key) {
            a[key] = _this.read(key);
            return a;
        }, {});
    };
    return Plate;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Plate;
//# sourceMappingURL=plate.js.map