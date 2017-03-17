import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Good} from "../libs/parcel";
import Marker from "../models/marker";
import MarkerComponent from "./marker-component";
import Page from "../models/page";
import Workbook from "../models/workbook";

interface P {
  workbook:Workbook
}

interface S {
  pageNumber:number,
  markerVersion:number
}

export default class MarkerViewerComponent extends Good<P, S> {
  componentWillMount() {
    this.componentWillReceiveProps(this.props)
  }

  shouldComponentUpdate(props, _) {
    return this.props.workbook !== props.workbook || this.state.pageNumber !== props.workbook.pageNumber || this.state.markerVersion !== props.workbook.currentPage.markerVersion
  }

  componentWillReceiveProps(props) {
    this.setState({
      pageNumber: props.workbook.pageNumber,
      markerVersion: props.workbook.currentPage.markerVersion
    })
  }

  writeMarkers() {
    let {scale} = this.props;
    let {markers} = this.props.workbook.currentPage;

    return markers.map((marker:Marker)=> {
      return <MarkerComponent {...{marker, scale, key: marker.id}}/>
    })
  }

  render() {
    return <div className="marker-viewer">
      {this.writeMarkers()}
    </div>
  }
}
