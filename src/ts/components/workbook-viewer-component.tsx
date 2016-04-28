import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Good} from "../libs/parcel";
import Marker from "../models/marker";
import MarkerViewerComponent from "./marker-viewer-component";
import SheetComponent from "./sheet-component";

export default class WorkbookViewerComponent extends Good {
  render() {
    let {dataURL, page, size} = this.props;

    if (!page) {
      return null;
    }

    let {x, y} = page.pagePosition;

    return <div className="viewer-area">
      <div className="workbook-area" style={{left: x, top: y}}>
        <div className="marker-area">
          <MarkerViewerComponent {...{page}}/> <SheetComponent {...{page, size}}/>
        </div>
        <img src={dataURL}/>
      </div>
    </div>
  }
}

