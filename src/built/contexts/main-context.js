"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require("../libs/parcel");
var constants_1 = require("../constants/constants");
require("zepto/zepto.min");
var MainContext = (function (_super) {
    __extends(MainContext, _super);
    function MainContext() {
        _super.apply(this, arguments);
    }
    MainContext.prototype.componentWillMount = function () {
        _super.prototype.componentWillMount.call(this);
        this.setState({
            file: this.props.file || null,
            state: constants_1.AppState.Ready
        });
    };
    MainContext.prototype.listen = function (to) {
        var _this = this;
        to(null, 'file:start', function () { return _this.setState({ file: null, state: constants_1.AppState.Wait }); });
        to(null, 'file:set', function (file) { return _this.setFile(file); });
    };
    MainContext.prototype.setFile = function (file) {
        this.setState({ file: file, state: constants_1.AppState.Ready });
    };
    MainContext.prototype.route = function (state) {
        this.routeChildren = this.props.children.filter(function (child) {
            return _.isUndefined(child.props.route) || child.props.route == state.route;
        });
    };
    MainContext.prototype.componentWillUpdate = function (props, state) {
        //this.route(state)
    };
    return MainContext;
}(parcel_1.Parcel));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainContext;
//# sourceMappingURL=main-context.js.map