"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var parcel_1 = require("../libs/parcel");
var MarkerViewerComponent = (function (_super) {
    __extends(MarkerViewerComponent, _super);
    function MarkerViewerComponent() {
        _super.apply(this, arguments);
    }
    MarkerViewerComponent.prototype.componentWillMount = function () {
        this.componentWillReceiveProps(this.props);
    };
    MarkerViewerComponent.prototype.shouldComponentUpdate = function (props, _) {
        return this.props.page !== props.page || this.state.version !== props.page.version;
    };
    MarkerViewerComponent.prototype.componentWillReceiveProps = function (props) {
        this.setState({ version: props.page.version });
    };
    MarkerViewerComponent.prototype.writeMarkers = function () {
        var _this = this;
        var scale = this.props.scale;
        var markers = this.props.page.markers;
        return markers.map(function (marker) {
            return React.createElement("div", {className: "marker", style: marker.wrapperCSS(scale), onMouseDown: function (e) { return _this.dispatch('marker:click', marker, e.nativeEvent.which === 3); }}, React.createElement("div", {className: "marker-draw", style: marker.innerCSS(scale)}, " "));
        });
    };
    MarkerViewerComponent.prototype.render = function () {
        return React.createElement("div", {className: "marker-area"}, this.writeMarkers());
    };
    return MarkerViewerComponent;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MarkerViewerComponent;
//# sourceMappingURL=marker-viewer-component.js.map