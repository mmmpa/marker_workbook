import React from 'react';
import MarkerViewerComponent from './marker-viewer-component';

export default class SheetComponent extends React.Component {
  render () {
    const {
      workbook,
      size,
      sheetVisibility,
      scale,
    } = this.props;

    if (!sheetVisibility) {
      return null;
    }

    const {
      width,
      height,
    } = size;

    const {
      x,
      y,
    } = workbook.currentPage.sheetPosition;

    return (
      <div className="sheet-area" style={{ left: x * scale, top: y * scale, width, height }}>
        <div className="sheet" />
        <div className="markers" style={{ left: -x * scale, top: -y * scale }}>
          <MarkerViewerComponent {...{ workbook, scale }} />
        </div>
      </div>
    );
  }
}
