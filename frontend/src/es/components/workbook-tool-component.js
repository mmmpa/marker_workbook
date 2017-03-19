import React from 'react';
import * as ReactAddons from 'react-addons';
import * as _ from 'lodash';
import { Good } from '../libs/parcel';
import {
  ToolMode,
} from '../constants/constants';
import Fa from '../libs/components/fa';

const classSet = ReactAddons.classSet;

export default class WorkbookToolComponent extends Good {
  watched: string[] = ['thickness', 'scale', 'pageNumber', 'sheetVisibility', 'mode'];

  componentWillMount () {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps (props) {
    this.setState(this.watched.reduce((a, k) => {
      a[k] = props[k];
      return a;
    }, {}));
  }

  prepare (props) {
    return !!this.watched.some(k => this.state[k] !== props[k]);
  }

  shouldComponentUpdate (props) {
    return this.props.page !== props.page || this.prepare(props);
  }

  cx (tool: ToolMode) {
    const { mode } = this.props;
    return classSet({
      'icon-button': true,
      'active-button': mode === tool,
    });
  }

  classesVisibility () {
    return classSet({
      'icon-button': true,
      'active-button': this.props.sheetVisibility,
    });
  }

  render () {
    const { thickness, sheetVisibility } = this.props;

    return (
      <div className="tool-area">
        <h1>Sheet</h1>
        <button className={this.classesVisibility()} onClick={() => this.dispatch('sheet:display', !sheetVisibility)}>
          <div className="icon">
            <Fa icon="file" />
          </div>
          <p>シートを表示</p>
        </button>
        <button className="icon-button" onClick={() => this.dispatch('workbook:position:reset')}>
          <div className="icon">
            <Fa icon="copy" />
          </div>
          <p>位置をリセット</p>
        </button>
        <button className={this.cx(ToolMode.SlidingPaper)} onClick={() => this.dispatch('tool:change:slide:paper')}>
          <div className="icon">
            <Fa icon="arrows" />
          </div>
          <p>ページを移動</p>
        </button>
        <button className={this.cx(ToolMode.SlidingSheet)} onClick={() => this.dispatch('tool:change:slide:sheet')}>
          <div className="icon">
            <Fa icon="file" /> <Fa icon="arrows" />
          </div>
          <p>シートを移動</p>
        </button>
        <h1>Marker</h1>
        <select
          className="thickness" value={thickness} onChange={(e) => {
          e.target.blur();
          this.dispatch('tool:thickness', +e.target.value);
        }}
        >
          {_.times(10, n =>
            <option value={(n + 1) * 10} key={n}>{`${(n + 1) * 10}px`}</option>)}
        </select>
        <button className={this.cx(ToolMode.DrawingMark)} onClick={() => this.dispatch('tool:change:draw:Marker')}>
          <div className="icon">
            <Fa icon="pencil" />
          </div>
          <p>マーカーを追加</p>
        </button>
        <button className={this.cx(ToolMode.DeletingMark)} onClick={() => this.dispatch('tool:change:delete:marker')}>
          <div className="icon">
            <Fa icon="eraser" />
          </div>
          <p>マーカーを消す</p>
        </button>
      </div>
    );
  }
}

