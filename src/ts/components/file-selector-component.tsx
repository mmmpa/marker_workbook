import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Good} from "../libs/parcel";
import FileHandler from "../models/file-handler";
import {FileType} from "../constants/constants";


declare const $:any;

export default class FileSelectorComponent extends Good {
  componentWillMount() {
    this.setState({
      file: this.props.file,
      page: 1,
      dataURL: null
    })
  }

  componentDidMount() {
  }

  writeDisplay(file?:FileHandler) {
    if (!file) {
      return null;
    }

    if (file.type === FileType.PDF) {
      file.pdf.page(1, (dataURL)=> this.setState({page: 1, file, dataURL}));
    } else {
      this.setState({dataURL: file.dataURL});
    }
  }

  page(page){
    this.setState({page})
    this.state.file.pdf.page(page, (dataURL)=> this.setState({dataURL}));
  }

  open() {
    let fileHandler = new FileHandler((file)=> this.writeDisplay(file));
    let $fileListener = $('<input type="file"/>');
    $fileListener.on('change', fileHandler.handler);
    $fileListener.trigger('click');
  }

  render() {
    return <div>
      <input type="number" value={this.state.page} onChange={(e)=> this.page(+e.target.value)}/>
      <button className="open" onClick={()=> this.open()}>open</button>
      <img src={this.state.dataURL}/>
    </div>
  }
}