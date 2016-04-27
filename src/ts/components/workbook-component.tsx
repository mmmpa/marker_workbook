import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Good} from "../libs/parcel";
import FileHandler from "../models/file-handler";
import {FileType, WorkbookState, ShortCut} from "../constants/constants";
import Marker from "../models/marker";

export default class WorkbookComponent extends Good {
  writeController() {
    if (!this.props.file.isPDF) {
      return null;
    }

    return <WorkbookPDFController {...this.relayingProps()}/>
  }

  onMouseDown(e:MouseEvent) {
    console.log(e.target, e.currentTarget)
    e.preventDefault();
    let {x, y} = this.mousePosition(e);
    let isRight = e.nativeEvent.which === 3;

    this.setShortCut(()=> this.detectPressAction(isRight)(x, y));
  }

  setShortCut(callback) {
    switch (true) {
      case this.props.keyControl.isDown('Space'):
        return this.setState({shortCut: ShortCut.Slide}, callback);
      default:
        return this.setState({shortCut: null}, callback)
    }
  }

  detectPressAction(isRight = false) {
    switch (true) {
      case this.props.keyControl.isDown('Space'):
        return (x, y)=> this.startDrag(x, y, isRight);
      default:
        return (x, y)=> this.startDrawMarker(x, y);
    }
  }

  startDrawMarker(startX, startY) {
    let offsetX =  -this.props.page.pagePosition.x
    let offsetY =  -this.props.page.pagePosition.y
    let marker = this.props.page.newMarker(startX + offsetX, startY + offsetY);

    let move = (e:MouseEvent)=> {
      let {x, y} = this.mousePosition(e);
      marker.to(x + offsetX, y + offsetY);
      this.props.page.update()
      this.setState({});
    };

    let clear = ()=> {
      $(window).off('mouseup', clear);
      $(window).off('mousemove', move);
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
    };

    $(window).on('mousemove', move);
    $(window).on('mouseup', clear);
  }

  detectDragAction(isRight = false):(startX, startY, x, y, endX, endY)=> void {
    switch (true) {
      case this.state.shortCut === ShortCut.Slide:
        return isRight
          ? (startX, startY, x, y, endX, endY)=> this.slideSheet(x, y, endX, endY)
          : (startX, startY, x, y, endX, endY)=> this.slidePage(x, y, endX, endY);
      default:
        return (startX, startY, x, y, endX, endY)=> this.drawMarker(startX, startY, endX, endY, this.rightColor)
    }
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

  get workspace() {
    return this.refs['workspace']
  }

  render() {
    if (!this.props.file) {
      return <div>ロードされていません。</div>;
    }

    return <div className="workbook-component" ref="workspace">
      <div className="workbook-controller">
        <WorkbookToolComponent {...this.relayingProps()}/>{this.writeController()}
      </div>
      <div className="workbook-container" onMouseDown={(e)=> this.onMouseDown(e) } onContextMenu={(e)=> e.preventDefault()}>
        <WorkbookViewerComponent {...this.relayingProps()}/>
      </div>
    </div>
  }
}

class WorkbookPDFController extends Good {
  pageNext(n) {
    this.dispatch('pdf:page', this.props.pageNumber + n);
  }

  writeRendering() {
    if (!this.isRendering) {
      return null;
    }
    return 'rendering';
  }

  get isRendering() {
    return this.props.workbookState === WorkbookState.Rendering
  }

  render() {
    let {pageNumber, pageCount, dataURL} = this.props;

    return <section className="pdf-tool">
      <div className="label"><label>{pageNumber}/{pageCount}</label></div>
      <button className="previous" disabled={this.isRendering} onClick={()=> this.pageNext(-1)}>prev</button>
      <button className="next" disabled={this.isRendering} onClick={()=> this.pageNext(+1)}>next</button>
      {this.writeRendering()}
    </section>
  }
}

class WorkbookToolComponent extends Good {
  render() {
    return <div className="tool-area">
      tools </div>
  }
}

class WorkbookViewerComponent extends Good {
  render() {
    let {dataURL, page, size} = this.props;

    if (!page) {
      return null;
    }

    let {x, y} = page.pagePosition;

    return <div className="viewer-area">
      <div className="workbook-area" style={{left: x, top: y}}>
        <div className="marker-area">
          <MarkerComponent {...{page}}/>
          <SheetComponent {...{page, size}}/>
        </div>
        <img src={dataURL}/>
      </div>
    </div>
  }
}

class SheetComponent extends React.Component {
  render() {
    let {page, size} = this.props;
    let {width, height} = size;
    let {x, y} = page.sheetPosition;

    return <div className="sheet-area" style={{left: x, top: y, width, height}}>
      <div className="sheet"></div>
      <div className="markers" style={{left: -x, top: -y}}>
        <MarkerComponent {...{page}}/>
      </div>
    </div>
  }
}

class MarkerComponent extends React.Component {
  componentWillMount() {
    this.componentWillReceiveProps(this.props)
  }

  shouldComponentUpdate(props, _) {
    return this.state.version !== props.page.version
  }

  componentWillReceiveProps(props) {
    this.setState({version: props.page.version})
  }

  writeMarkers() {
    let {markers} = this.props.page;

    return markers.map((marker:Marker)=> {
      return <div className="marker" style={marker.wrapperCSS}>
        <div className="marker-draw" style={marker.innerCSS}>marker</div>
      </div>
    })
  }

  render() {
    return <div className="marker-area">
      {this.writeMarkers()}
    </div>
  }
}