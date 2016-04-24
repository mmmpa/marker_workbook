import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Good} from "../libs/parcel";
import FileHandler from "../models/file-handler";
import {FileType} from "../constants/constants";


declare const $:any;

export default class FileSelectorComponent extends Good {
  componentWillMount() {
    this.setState({
      file: this.props.file
    })
  }

  componentDidMount() {
  }

  writeDisplay(file?:FileHandler) {
    if (!file) {
      return null;
    }
    if (file.type === FileType.PDF) {

    } else {
      return <img src={file.dataURL}/>;
    }
  }

  open() {
    let fileHandler = new FileHandler((file)=> this.setState({file}));
    let $fileListener = $('<input type="file"/>');
    $fileListener.on('change', fileHandler.handler);
    $fileListener.trigger('click');
  }

  render() {
    return <div>
      <button className="open" onClick={()=> this.open()}>open</button>
      {this.writeDisplay(this.state.file)}
    </div>
  }
}