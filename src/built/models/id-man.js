"use strict";
var IDMan = (function () {
    function IDMan() {
        if (!IDMan.store[this.myName]) {
            IDMan.store[this.myName] = 0;
        }
        this.id = IDMan.store[this.myName] += 1;
    }
    IDMan.genId = function () {
        return this.id++;
    };
    Object.defineProperty(IDMan.prototype, "myName", {
        get: function () {
            return this.constructor.toString().match(/function[ ]+([a-zA-Z0-9_]+)/)[1];
        },
        enumerable: true,
        configurable: true
    });
    IDMan.store = {};
    return IDMan;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IDMan;
//# sourceMappingURL=id-man.js.map