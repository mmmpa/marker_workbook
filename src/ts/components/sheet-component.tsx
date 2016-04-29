import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Good} from "../libs/parcel";
import MarkerViewerComponent from "./marker-viewer-component";

export default class SheetComponent extends React.Component {
  render() {
    let {page, size, sheetVisibility, scale} = this.props;
    let {width, height} = size;
    let {x, y} = page.sheetPosition;

    if(!sheetVisibility){
      return null;
    }

    return <div className="sheet-area" style={{left: x * scale, top: y * scale, width, height}}>
      <div className="sheet"></div>
      <div className="markers" style={{left: -x * scale, top: -y * scale}}>
        <MarkerViewerComponent {...{page, scale}}/>
      </div>
    </div>
  }
}
