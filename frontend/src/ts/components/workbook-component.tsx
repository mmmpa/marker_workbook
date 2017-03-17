import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Good} from "../libs/parcel";
import {
  ToolMode,
  WorkbookState
} from "../constants/constants";
import WorkbookToolComponent from "./workbook-tool-component";
import WorkbookViewerComponent from "./workbook-viewer-component";
import WorkbookPDFController from "./pdf-controller";
import Workbook from "../models/workbook";
import ReactInstance = __React.ReactInstance;
import FileHandler from "../models/file-handler";
import KeyControl from "../models/key-control";

interface P {
  workbookState:WorkbookState,
  scale:number,
  workbook:Workbook,
  file:FileHandler,
  thickness:number,
  keyControl:KeyControl
}

export default class WorkbookComponent extends Good<P,{}> {
  get currentPage() {
    return this.props.workbook.currentPage
  }

  onMouseDown(e:any) {
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
    let {scale} = this.props;
    let offsetX = -this.currentPage.pagePosition.x;
    let offsetY = -this.currentPage.pagePosition.y;
    let marker = this.currentPage.newMarker((startX + offsetX) / scale, (startY + offsetY) / scale, this.props.thickness);

    let move = (e:MouseEvent)=> {
      let {x, y} = this.mousePosition(e);
      marker.to((x + offsetX) / scale, (y + offsetY) / scale);
      this.currentPage.updateMarker();
      this.setState({});
    };

    let clear = ()=> {
      $(window).unbind('mouseup', clear);
      $(window).unbind('mousemove', move);
      this.dispatch('workbook:save');
    };

    $(window).bind('mousemove', move);
    $(window).bind('mouseup', clear);
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
    this.currentPage.moveSheet(endX - x, endY - y);
    this.setState({})
  }

  slidePage(x, y, endX, endY) {
    this.currentPage.movePage(endX - x, endY - y);
    this.setState({})
  }

  mousePosition(e:MouseEvent) {
    var x = e.pageX - this.workspace.offsetLeft - 100;
    var y = e.pageY - this.workspace.offsetTop - 40;
    return {x, y};
  }

  get workspace():HTMLElement {
    return this.refs['workspace'] as HTMLElement;
  }

  render() {
    if (!this.props.file) {
      return <div className="workbook-component" ref="workspace">
        <div className="workbook-controller"></div>
      </div>;
    }

    let {workbook, mode, size, dataURL, thickness, sheetVisibility, scale, workbookState} = this.props

    return <div className="workbook-component" ref="workspace">
      <div className="workbook-controller"><WorkbookToolComponent {...{workbook, mode, thickness, sheetVisibility}}/> <WorkbookPDFController {...{workbook, workbookState, scale}}/>
      </div>
      <div className="workbook-container" onMouseDown={(e)=> this.onMouseDown(e)} onContextMenu={(e)=> e.preventDefault()}>
        <WorkbookViewerComponent {...{workbook, size, dataURL, sheetVisibility, scale}}/>
      </div>
    </div>
  }
}

