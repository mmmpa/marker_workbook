"use strict";
(function (Route) {
    Route[Route["FileSelector"] = 0] = "FileSelector";
    Route[Route["Workbook"] = 1] = "Workbook";
})(exports.Route || (exports.Route = {}));
var Route = exports.Route;
(function (FileType) {
    FileType[FileType["Unknown"] = 0] = "Unknown";
    FileType[FileType["Image"] = 1] = "Image";
    FileType[FileType["PDF"] = 2] = "PDF";
})(exports.FileType || (exports.FileType = {}));
var FileType = exports.FileType;
(function (AppState) {
    AppState[AppState["Ready"] = 0] = "Ready";
    AppState[AppState["Wait"] = 1] = "Wait";
})(exports.AppState || (exports.AppState = {}));
var AppState = exports.AppState;
(function (WorkbookState) {
    WorkbookState[WorkbookState["Ready"] = 0] = "Ready";
    WorkbookState[WorkbookState["Rendering"] = 1] = "Rendering";
})(exports.WorkbookState || (exports.WorkbookState = {}));
var WorkbookState = exports.WorkbookState;
(function (ToolMode) {
    ToolMode[ToolMode["SlidingPaper"] = 0] = "SlidingPaper";
    ToolMode[ToolMode["SlidingSheet"] = 1] = "SlidingSheet";
    ToolMode[ToolMode["DrawingMark"] = 2] = "DrawingMark";
    ToolMode[ToolMode["DeletingMark"] = 3] = "DeletingMark";
})(exports.ToolMode || (exports.ToolMode = {}));
var ToolMode = exports.ToolMode;
(function (ShortCut) {
    ShortCut[ShortCut["Slide"] = 0] = "Slide";
    ShortCut[ShortCut["Draw"] = 1] = "Draw";
})(exports.ShortCut || (exports.ShortCut = {}));
var ShortCut = exports.ShortCut;
//# sourceMappingURL=constants.js.map