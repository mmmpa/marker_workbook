import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Good} from "../libs/parcel";
import {WorkbookState} from "../constants/constants";
import Fa from "../libs/fa";
import Workbook from "../models/workbook";
import KeyControl from "../models/key-control";

interface P {
  keyControl:KeyControl,
  workbookState:WorkbookState,
  scale:number,
  workbook:Workbook
}

export default class WorkbookPDFController extends Good<P,{}> {
  pageNext(n) {
    this.dispatch('pdf:page', n);
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
    let {workbook} = this.props;

    if (!workbook || !workbook.isPDF) {
      return null;
    }
    let {pageNumber, pageCount} = workbook;

    return <section className="pdf-tool">
      <h1>PDF</h1>
      <select className="scale" value={this.props.scale} onChange={(e)=> {
            this.dispatch('workbook:scale', +e.target.value)
        }}>
        {[0.5, 1, 2, 3, 4].map((n)=> <option value={n} key={n}>{`${n * 100}%`}</option>)}
      </select>
      <button className="icon-button next" disabled={this.isRendering} onClick={()=> this.pageNext(pageNumber + 1)}>
        <div><Fa icon="chevron-right"/></div>
        <p>次ページ</p>
      </button>
      <button className="icon-button previous" disabled={this.isRendering} onClick={()=> this.pageNext(pageNumber - 1)}>
        <div><Fa icon="chevron-left"/></div>
        <p>前ページ</p>
      </button>
      <div className="page-number"><label>{pageNumber}/{pageCount}</label></div>
      {this.writeRendering()}
    </section>
  }
}

