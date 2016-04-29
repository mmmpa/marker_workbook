import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Good} from "../libs/parcel";
import {ShortCut, ToolMode} from "../constants/constants";
import WorkbookToolComponent from "./workbook-tool-component";
import WorkbookViewerComponent from "./workbook-viewer-component";
import WorkbookPDFController from "./pdf-controller";

export default class WorkbookComponent extends Good {
  onMouseDown(e:MouseEvent) {
    e.preventDefault();
    let target = e.target;
    let {x, y} = this.mousePosition(e);
    let isRight = e.nativeEvent.which === 3;
    this.detectPressAction(isRight)(x, y, target);
  }

  detectPressAction(isRight = false) {
    let {mode, keyControl} = this.props;

    switch (true) {
      case keyControl.isDown('Space') || mode === ToolMode.SlidingPaper:
        return (x, y)=> this.startDrag(x, y, isRight);
      case mode === ToolMode.SlidingSheet:
        return (x, y)=> this.startDrag(x, y, !isRight);
      case mode === ToolMode.DeletingMark:
        return isRight
          ? (x, y)=> this.startDrawMarker(x, y)
          : (...args)=> null;
      default:
        return isRight
          ? (...args)=> null
          : (x, y)=> this.startDrawMarker(x, y);
    }
  }

  startDrawMarker(startX, startY) {
    let offsetX = -this.props.page.pagePosition.x
    let offsetY = -this.props.page.pagePosition.y
    let marker = this.props.page.newMarker(startX + offsetX, startY + offsetY, this.props.thickness);

    let move = (e:MouseEvent)=> {
      let {x, y} = this.mousePosition(e);
      marker.to(x + offsetX, y + offsetY);
      this.props.page.update()
      this.setState({});
    };

    let clear = ()=> {
      $(window).off('mouseup', clear);
      $(window).off('mousemove', move);
      this.dispatch('workbook:save');
    };

    $(window).on('mousemove', move);
    $(window).on('mouseup', clear);
  }

  startDrag(startX, startY, isRight = false) {
    let drag = this.detectDragAction(isRight);

    let pre = {x: startX, y: startY};

    let move = (e:MouseEvent)=> {
      let {x, y} = this.mousePosition(e);
      drag(startX, startY, pre.x, pre.y, x, y);
      pre = {x, y}
    };

    let clear = ()=> {
      $(window).off('mouseup', clear);
      $(window).off('mousemove', move);
      this.dispatch('workbook:save');
    };

    $(window).on('mousemove', move);
    $(window).on('mouseup', clear);
  }

  detectDragAction(isRight = false):(startX, startY, x, y, endX, endY)=> void {
    return isRight
      ? (startX, startY, x, y, endX, endY)=> this.slideSheet(x, y, endX, endY)
      : (startX, startY, x, y, endX, endY)=> this.slidePage(x, y, endX, endY);
  }

  onPressDouble(x, y) {
    this.dispatch('workspace:press:double', x, y);
  }

  slideSheet(x, y, endX, endY) {
    this.props.page.moveSheet(endX - x, endY - y);
    this.setState({})
  }

  slidePage(x, y, endX, endY) {
    this.props.page.movePage(endX - x, endY - y);
    this.setState({})
  }

  mousePosition(e:MouseEvent) {
    var x = e.pageX - this.workspace.offsetLeft;
    var y = e.pageY - this.workspace.offsetTop;
    return {x, y};
  }

  get  workspace() {
    return this.refs['workspace']
  }

  writeController() {
    if (!this.props.file.isPDF) {
      return null;
    }
    let {pageNumber, pageCount, workbookState} = this.props;
    return <WorkbookPDFController {...{pageNumber, pageCount, workbookState}}/>
  }

  render() {
    if (!this.props.file) {
      return <div className="workbook-component" ref="workspace">
        <div className="workbook-controller"></div>
      </div>;
    }

    let {mode, page, size, dataURL, thickness, sheetVisibility} = this.props

    return <div className="workbook-component" ref="workspace">
      <div className="workbook-controller">
        <WorkbookToolComponent {...{mode, thickness, sheetVisibility}}/>{this.writeController()}
      </div>
      <div className="workbook-container" onMouseDown={(e)=> this.onMouseDown(e)} onContextMenu={(e)=> e.preventDefault()}>
        <WorkbookViewerComponent {...{page, size, dataURL, sheetVisibility}}/>
      </div>
    </div>
  }
}

