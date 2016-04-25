import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Good} from "../libs/parcel";
import FileHandler from "../models/file-handler";
import {FileType, WorkbookState} from "../constants/constants";

export default class WorkbookComponent extends Good {
  writeController(){
    if(!this.props.file.isPDF){
      return null;
    }

    return <WorkbookPDFController {...this.relayingProps()}/>
  }

  render() {
    if (!this.props.file) {
      return <div>ロードされていません。</div>;
    }

    let {markers, dataURL} = this.props

    return <div>
      <div className="controller">
        <WorkbookToolComponent {...this.relayingProps()}/>
        {this.writeController()}
      </div>
      <WorkbookViewerComponent {...this.relayingProps()}/>
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
    let {dataURL} = this.props;

    return <div className="viewer-area">
      <div className="container">
        <div className="marker-area">
          {this.props.markers}
        </div>
        <img src={dataURL}/>
      </div>
    </div>
  }
}