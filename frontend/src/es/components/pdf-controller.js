import React from 'react';
import { Good } from '../libs/parcel';
import { WorkbookState } from '../constants/constants';
import Fa from '../libs/components/fa';

export default class WorkbookPDFController extends Good {
  pageNext (n) {
    this.dispatch('pdf:page', n);
  }

  writeRendering () {
    if (!this.isRendering) {
      return null;
    }
    return <p className="rendering"><Fa icon="spinner" animation="pulse" /></p>;
  }

  get isRendering () {
    return this.props.workbookState === WorkbookState.Rendering;
  }

  render () {
    const { workbook } = this.props;

    if (!workbook || !workbook.isPDF) {
      return null;
    }
    const { pageNumber, pageCount } = workbook;

    return (
      <section className="pdf-tool">
        <h1>PDF</h1>
        <select
          className="scale" value={this.props.scale} onChange={(e) => {
          this.dispatch('workbook:scale', +e.target.value);
        }}
        >
          {[0.5, 1, 2, 3, 4].map(n =>
            <option value={n} key={n}>{`${n * 100}%`}</option>)}
        </select>
        <button className="icon-button next" disabled={this.isRendering} onClick={() => this.pageNext(pageNumber + 1)}>
          <div><Fa icon="chevron-right" /></div>
          <p>次ページ</p>
        </button>
        <button className="icon-button previous" disabled={this.isRendering} onClick={() => this.pageNext(pageNumber - 1)}>
          <div><Fa icon="chevron-left" /></div>
          <p>前ページ</p>
        </button>
        <div className="page-number">
          <label htmlFor="">{pageNumber}/{pageCount}</label>
        </div>
        {this.writeRendering()}
      </section>
    );
  }
}
