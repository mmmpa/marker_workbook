/// <reference path="./typings/browser.d.ts" />
"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
var constants_1 = require('./constants/constants');
var main_context_1 = require("./contexts/main-context");
var file_selector_context_1 = require("./contexts/file-selector-context");
var workbook_context_1 = require("./contexts/workbook-context");
var workbook_component_1 = require("./components/workbook-component");
var file_selector_component_1 = require("./components/file-selector-component");
var MarkerWorkbook = (function () {
    function MarkerWorkbook() {
    }
    MarkerWorkbook.run = function (dom, firstDataURI, firstWorkbookData) {
        ReactDOM.render(React.createElement("article", {className: "dot-body"}, React.createElement(main_context_1.default, React.__spread({}, { firstDataURI: firstDataURI, firstWorkbookData: firstWorkbookData }), React.createElement(file_selector_context_1.default, {route: constants_1.Route.FileSelector}, React.createElement(file_selector_component_1.default, null)), React.createElement(workbook_context_1.default, {route: constants_1.Route.Workbook}, React.createElement(workbook_component_1.default, null)))), dom);
    };
    return MarkerWorkbook;
}());
window.MarkerWorkbook = MarkerWorkbook;
//# sourceMappingURL=index.js.map