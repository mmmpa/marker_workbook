"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var parcel_1 = require("../libs/parcel");
var marker_component_1 = require("./marker-component");
var MarkerViewerComponent = (function (_super) {
    __extends(MarkerViewerComponent, _super);
    function MarkerViewerComponent() {
        _super.apply(this, arguments);
    }
    MarkerViewerComponent.prototype.componentWillMount = function () {
        this.componentWillReceiveProps(this.props);
    };
    MarkerViewerComponent.prototype.shouldComponentUpdate = function (props, _) {
        return this.props.workbook !== props.workbook || this.state.pageNumber !== props.workbook.pageNumber || this.state.markerVersion !== props.workbook.currentPage.markerVersion;
    };
    MarkerViewerComponent.prototype.componentWillReceiveProps = function (props) {
        this.setState({
            pageNumber: props.workbook.pageNumber,
            markerVersion: props.workbook.currentPage.markerVersion
        });
    };
    MarkerViewerComponent.prototype.writeMarkers = function () {
        var scale = this.props.scale;
        var markers = this.props.workbook.currentPage.markers;
        return markers.map(function (marker) {
            return React.createElement(marker_component_1.default, React.__spread({}, { marker: marker, scale: scale, key: marker.id }));
        });
    };
    MarkerViewerComponent.prototype.render = function () {
        return React.createElement("div", {className: "marker-viewer"}, this.writeMarkers());
    };
    return MarkerViewerComponent;
}(parcel_1.Good));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MarkerViewerComponent;
//# sourceMappingURL=marker-viewer-component.js.map