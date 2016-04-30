"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parcel_1 = require("../libs/parcel");
var file_handler_1 = require("../models/file-handler");
var constants_1 = require("../constants/constants");
var key_control_1 = require("../models/key-control");
var workbook_record_1 = require("../records/workbook-record");
require("zepto/zepto.min");
var MainContext = (function (_super) {
    __extends(MainContext, _super);
    function MainContext() {
        _super.apply(this, arguments);
    }
    MainContext.prototype.componentWillMount = function () {
        var _this = this;
        _super.prototype.componentWillMount.call(this);
        var defaultState = {
            file: null,
            state: constants_1.AppState.Ready,
            keyControl: new key_control_1.default({ killer: {
                    'onSpace': true,
                    'onArrowLeft': true,
                    'onArrowRight': true,
                } })
        };
        var _a = this.props, firstDataURI = _a.firstDataURI, firstWorkbookData = _a.firstWorkbookData;
        if (firstDataURI) {
            defaultState.state = constants_1.AppState.Wait;
            this.setState(defaultState, function () {
                new file_handler_1.default(function (file) {
                    if (firstWorkbookData) {
                        new workbook_record_1.default(file.key).write('workbook', firstWorkbookData);
                    }
                    _this.dispatch('file:set', file);
                }, firstDataURI);
            });
        }
        else {
            this.setState(defaultState);
        }
    };
    MainContext.prototype.listen = function (to) {
        var _this = this;
        to(null, 'file:start', function () { return _this.setState({ file: null, state: constants_1.AppState.Wait }); });
        to(null, 'file:set', function (file) { return _this.setFile(file); });
        to(null, 'workbook:save:json', function (json) { return _this.save(json); });
    };
    MainContext.prototype.save = function (json) {
        new workbook_record_1.default(this.state.file.key).write('workbook', json);
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