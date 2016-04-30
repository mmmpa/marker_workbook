import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Good} from "../libs/parcel";
import Marker from "../models/marker";

interface P{
  marker:Marker,
  scale:number
}

export default class MarkerComponent extends Good<P, {}> {
  onMouseDown(e) {
    this.dispatch('marker:click', this.props.marker, e.nativeEvent.which === 3)
  }

  render() {
    let {marker, scale} = this.props;
    let wrapper = marker.wrapperCSS(scale);
    let inner = marker.innerCSS(scale);

    return <div className="marker" style={wrapper} onMouseDown={(e)=> this.onMouseDown(e)}>
      <div className="marker-inner" style={inner}>&nbsp;</div>
    </div>
  }
}