import React from 'react';
import { Good } from '../libs/parcel';
import Marker from '../models/marker';
import MarkerComponent from './marker-component';

export default class MarkerViewerComponent extends Good {
  componentWillMount () {
    this.componentWillReceiveProps(this.props);
  }

  shouldComponentUpdate (props) {
    return this.props.workbook !== props.workbook
      || this.state.pageNumber !== props.workbook.pageNumber
      || this.state.markerVersion !== props.workbook.currentPage.markerVersion;
  }

  componentWillReceiveProps (props) {
    this.setState({
      pageNumber: props.workbook.pageNumber,
      markerVersion: props.workbook.currentPage.markerVersion,
    });
  }

  writeMarkers () {
    const { scale } = this.props;
    const { markers } = this.props.workbook.currentPage;

    return markers.map((marker: Marker) =>
      <MarkerComponent {...{ marker, scale, key: marker.id }} />);
  }

  render () {
    return (
      <div className="marker-viewer">
        {this.writeMarkers()}
      </div>
    );
  }
}
