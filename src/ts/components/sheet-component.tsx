import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Good} from "../libs/parcel";
import MarkerViewerComponent from "./marker-viewer-component";

export default class SheetComponent extends React.Component {
  render() {
    let {page, size, sheetVisibility} = this.props;
    let {width, height} = size;
    let {x, y} = page.sheetPosition;

    if(!sheetVisibility){
      return null;
    }

    return <div className="sheet-area" style={{left: x, top: y, width, height}}>
      <div className="sheet"></div>
      <div className="markers" style={{left: -x, top: -y}}>
        <MarkerViewerComponent {...{page}}/>
      </div>
    </div>
  }
}
