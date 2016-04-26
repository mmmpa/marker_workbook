import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Good} from "../libs/parcel";

declare const $:any;

export default class FileSelectorComponent extends Good {
  open(e) {
    .e.target.blur();
    this.dispatch('file:open');
  }

  render() {
    return <div className="file-selector-component">
      <button className="open" onClick={(e)=> this.open(e)}>open</button>
      <div className="information">
        <FileInformationComponent {...{file: this.props.file}}/>
      </div>
    </div>
  }
}

class FileInformationComponent extends React.Component {
  render() {
    if (!this.props.file) {
      return null;
    }

    return <div className="file-information">
      <section className="file-name">
        name:{this.props.file.name}
      </section>
      <section className="file-key">
        key:{this.props.file.key}（localStorage保存時に使用）
      </section>
    </div>
  }
}