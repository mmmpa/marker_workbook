import ARGB from "../models/argb";
export enum Route{
  FileSelector,
  Workbook
}

export enum FileType{
  Unknown,
  Image,
  PDF
}

export enum AppState{
  Ready,
  Wait
}

export enum WorkbookState{
  Ready,
  Rendering
}

export enum ToolMode{
  SlidingPaper,
  SlidingSheet,
  DrawingMark,
  DeletingMark,
  OpenFile,
  
}

export enum ShortCut{
  Slide,
  Draw
}