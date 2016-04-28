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

  render() {
    return <div className="tool-area">
      <button className={this.classesFor(ToolMode.SlidingPaper)} onClick={()=> this.dispatch('tool:change:slide:paper')}>
        <div className="icon">
          <Fa icon="hand-paper-o"/>
        </div>
        <p>ページを移動</p>
      </button>
      <button className={this.classesFor(ToolMode.SlidingSheet)} onClick={()=> this.dispatch('tool:change:slide:sheet')}>
        <div className="icon">
          <Fa icon="file-o"/> <Fa icon="hand-paper-o"/>
        </div>
        <p>シートを移動</p>
      </button>
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

