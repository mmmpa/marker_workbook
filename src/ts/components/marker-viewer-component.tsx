import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Good} from "../libs/parcel";
import Marker from "../models/marker";

export default class MarkerViewerComponent extends Good {
  componentWillMount() {
    this.componentWillReceiveProps(this.props)
  }

  shouldComponentUpdate(props, _) {
    return this.props.page !== props.page || this.state.version !== props.page.version
  }

  componentWillReceiveProps(props) {
    this.setState({version: props.page.version})
  }

  writeMarkers() {
    let {markers} = this.props.page;

    return markers.map((marker:Marker)=> {
      return <div className="marker" style={marker.wrapperCSS} onMouseDown={(e)=> this.dispatch('marker:click', marker, e.nativeEvent.which === 3)}>
        <div className="marker-draw" style={marker.innerCSS}>&nbsp;</div>
      </div>
    })
  }

  render() {
    return <div className="marker-area">
      {this.writeMarkers()}
    </div>
  }
}