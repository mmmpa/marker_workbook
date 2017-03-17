import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Good} from "../libs/parcel";
import Marker from "../models/marker";
import MarkerViewerComponent from "./marker-viewer-component";
import SheetComponent from "./sheet-component";

export default class WorkbookViewerComponent extends Good {
  render() {
    let {dataURL, workbook, size, sheetVisibility, scale} = this.props;

    if (!workbook) {
      return null;
    }

    let {x, y} = workbook.currentPage.pagePosition;

    return <div className="viewer-area">
      <div className="workbook-area" style={{left: x, top: y}}>
        <div className="marker-area">
          <MarkerViewerComponent {...{workbook, scale}}/> <SheetComponent {...{workbook, size, sheetVisibility, scale}}/>
        </div>
        <img src={dataURL}/>
      </div>
    </div>
  }
}

