import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Good} from "../libs/parcel";

declare const $:any;

export default class FileSelectorComponent extends Good {
  render() {
    return <div>
      <button className="open" onClick={()=> this.dispatch('file:open')}>open</button>
      <div className="information">
        <FileInformationComponent {...{file: this.props.file}}/>
      </div>
    </div>
  }
}

class FileInformationComponent extends React.Component{
  render(){
    if(!this.props.file){
      return null;
    }

    return <div clannName="file-information">
      <section className="file-name">
        name:{this.props.file.name}
      </section>
      <section className="file-key">
        key:{this.props.file.key}（localStorage保存時に使用）
      </section>
    </div>
  }
}