import React from 'react';
import { Good } from '../libs/parcel';

export default class MarkerComponent extends Good {
  onMouseDown (e) {
    this.dispatch('marker:click', this.props.marker, e.nativeEvent.which === 3);
  }

  render () {
    const {
      marker,
      scale,
    } = this.props;

    const wrapper = marker.wrapperCSS(scale);
    const inner = marker.innerCSS(scale);

    return (
      <div className="marker" style={wrapper} onMouseDown={e => this.onMouseDown(e)}>
        <div className="marker-inner" style={inner}>&nbsp;</div>
      </div>
    );
  }
}
