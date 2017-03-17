var StateMachine = (function () {
    function StateMachine(getState, initialState) {
        this._state = null;
        this.getState = getState;
        this._state = initialState || this.getState();
    }
    Object.defineProperty(StateMachine.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    StateMachine.prototype.is = function (s) {
        return this._state === s;
    };
    StateMachine.prototype.find = function (name, s, s2) {
        if (!s2) {
            if (!this.listeners[name][s]) {
                this.listeners[name][s] = [];
            }
            return this.listeners[name][s];
        }
        if (!this.listeners[name][s2]) {
            this.listeners[name][s2] = {};
        }
        if (!this.listeners[name][s2][s]) {
            this.listeners[name][s2][s] = [];
        }
        return this.listeners[name][s2][s];
    };
    StateMachine.prototype.onEnter = function (s, f) {
        this.find('onEnter', s).push(f);
    };
    StateMachine.prototype.onExit = function (s, f) {
        this.find('onExit', s).push(f);
    };
    StateMachine.prototype.onFromTo = function (from, to, f) {
        this.find('onFromTo', from, to).push(f);
    };
    StateMachine.prototype.transact = function (to) {
        var next = to || this.getState();
        var now = this.state;
        if (next === now) {
            return;
        }
        this.fromTo(now, next);
        this.exit(now);
        this.enter(next);
        this._state = to;
    };
    StateMachine.prototype.fromTo = function (f, t) {
        var _this = this;
        this.find('onFromTo', f, t).forEach(function (f) { return f(_this.state); });
    };
    StateMachine.prototype.exit = function (s) {
        var _this = this;
        this.find('onExit', s).forEach(function (f) { return f(_this.state); });
    };
    StateMachine.prototype.enter = function (s) {
        var _this = this;
        this.find('onEnter', s).forEach(function (f) { return f(_this.state); });
    };
    return StateMachine;
}());
//# sourceMappingURL=state_machine.js.map