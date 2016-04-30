import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Good} from "../libs/parcel";
import Fa from "../libs/fa";
import FileHandler from "../models/file-handler";

declare const $:any;

export default class FileSelectorComponent extends Good<{file:FileHandler},{}> {
  shouldComponentUpdate(props, _) {
    return this.props.file !== props.file;
  }

  open(e) {
    this.dispatch('file:open');
  }

  render() {
    return <div className="file-selector">
      <button className="icon-button open" onClick={(e)=> this.open(e)}>
        <div><Fa icon="folder-open-o"/></div>
        <p>ファイルを開く</p>
      </button>
      <FileInformationComponent {...{file: this.props.file}}/>
    </div>
  }
}

class FileInformationComponent extends React.Component<{file:FileHandler},{}> {
  render() {
    if (!this.props.file) {
      return null;
    }

    return <div className="file-information">
      <section className="file-name">
        name:{this.props.file.name}
      </section>
      <section className="file-key">
        key:{this.props.file.key}
      </section>
    </div>
  }
}