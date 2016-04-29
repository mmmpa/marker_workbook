import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Good} from "../libs/parcel";
import {WorkbookState} from "../constants/constants";
import Fa from "../libs/fa";

export default class WorkbookPDFController extends Good {
  pageNext(n) {
    this.dispatch('pdf:page', this.props.pageNumber + n);
  }

  writeRendering() {
    if (!this.isRendering) {
      return null;
    }
    return <p className="rendering"><Fa icon="spinner" animation="pulse"/></p>;
  }

  get isRendering() {
    return this.props.workbookState === WorkbookState.Rendering
  }

  render() {
    let {pageNumber, pageCount} = this.props;
    return <section className="pdf-tool">
      <button className="icon-button next" disabled={this.isRendering} onClick={()=> this.pageNext(+1)}>
        <div><Fa icon="chevron-right"/></div>
        <p>次ページ</p>
      </button>
      <button className="icon-button previous" disabled={this.isRendering} onClick={()=> this.pageNext(-1)}>
        <div><Fa icon="chevron-left"/></div>
        <p>前ページ</p>
      </button>
      <div className="page-number"><label>{pageNumber}/{pageCount}</label></div>
      {this.writeRendering()}
    </section>
  }
}

