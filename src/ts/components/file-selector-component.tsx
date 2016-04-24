import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Good} from "../libs/parcel";
import FileHandler from "../models/file-handler";

declare const $:any;

export default class FileSelectorComponent extends Good {
  open() {
    let fileHandler = new FileHandler((file)=> this.dispatch('file:set', file));
    let $fileListener = $('<input type="file"/>');
    $fileListener.bind('change', fileHandler.handler);
    $fileListener.trigger('click');
  }

  render() {
    return <div>
      <button className="open" onClick={()=> this.open()}>open</button>
    </div>
  }
}