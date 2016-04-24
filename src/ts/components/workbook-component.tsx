import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Good} from "../libs/parcel";
import FileHandler from "../models/file-handler";
import {FileType} from "../constants/constants";

export default class WorkbookComponent extends Good {
  componentWillMount() {
    this.setState({});
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps(props) {
    if (this.props.file !== props.file) {
      this.initialize(props.file)
    }
  }

  initialize(file?:FileHandler) {
    if (!file) {
      return null;
    }

    if (file.type === FileType.PDF) {
      file.pdf.page(1, (dataURL)=> this.setState({page: 1, file, dataURL}));
    } else {
      this.setState({dataURL: file.dataURL});
    }
  }

  page(page) {
    this.setState({page})
    this.state.file.pdf.page(page, (dataURL)=> this.setState({dataURL}));
  }

  render() {
    return <div>
      <input type="number" value={this.state.page} onChange={(e)=> this.page(+e.target.value)}/> <img src={this.state.dataURL}/>
    </div>
  }
}