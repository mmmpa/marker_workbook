import * as React from "react";
import * as ReactAddons from "react-addons";
import * as ReactDOM from 'react-dom';
import {Good} from "../libs/parcel";
import {WorkbookState, ToolMode} from "../constants/constants";
import Fa from "../libs/fa";

const classSet = ReactAddons.classSet;

export default class WorkbookToolComponent extends Good {
  classesFor(tool:ToolMode) {
    let {mode} = this.props;
    return classSet({
      'icon-button': true,
      'active-button': mode === tool
    });
  }

  classesVisibility() {
    return classSet({
      'icon-button': true,
      'active-button': this.props.sheetVisibility
    });
  }

  render() {
    console.log(this.props)
    return <div className="tool-area">
      <button className={this.classesVisibility()} onClick={()=> this.dispatch('sheet:display', !this.props.sheetVisibility)}>
        <div className="icon">
          <Fa icon="file"/>
        </div>
        <p>シートを表示</p>
      </button>
      <button className="icon-button" onClick={()=> this.dispatch('paper:position:reset')}>
        <div className="icon">
          <Fa icon="copy"/>
        </div>
        <p>位置をリセット</p>
      </button>
      <button className={this.classesFor(ToolMode.SlidingPaper)} onClick={()=> this.dispatch('tool:change:slide:paper')}>
        <div className="icon">
          <Fa icon="arrows"/>
        </div>
        <p>ページを移動</p>
      </button>
      <button className={this.classesFor(ToolMode.SlidingSheet)} onClick={()=> this.dispatch('tool:change:slide:sheet')}>
        <div className="icon">
          <Fa icon="file"/> <Fa icon="arrows"/>
        </div>
        <p>シートを移動</p>
      </button>
      <select className="thickness" value={this.props.thickness} onChange={(e)=> this.dispatch('tool:thickness', +e.target.value)}>
        {_.times(10, (n)=> <option value={(n + 1) * 10}>{`${(n + 1) * 10}px`}</option>)}
      </select>
      <button className={this.classesFor(ToolMode.DrawingMark)} onClick={()=> this.dispatch('tool:change:draw:Marker')}>
        <div className="icon">
          <Fa icon="pencil"/>
        </div>
        <p>マーカーを追加</p>
      </button>
      <button className={this.classesFor(ToolMode.DeletingMark)} onClick={()=> this.dispatch('tool:change:delete:marker')}>
        <div className="icon">
          <Fa icon="eraser"/>
        </div>
        <p>マーカーを消す</p>
      </button>
    </div>
  }
}

