import * as changeCase from 'change-case';
import {FileType} from "../constants/constants";

export default class FileHandler {
  public type:FileType;
  public dataURL:string;

  constructor(public callback) {

  }

  getExtension(fileName) {
    return changeCase.lowerCase(fileName.split('.').pop());
  }

  detectFileType(fileName) {
    switch (this.getExtension(fileName)) {
      case 'pdf':
        return FileType.PDF
      default:
        return FileType.Image
    }
  }

  get handler() {
    return (e)=> {
      let file = e.path[0].files[0];
      let reader = new FileReader();
      this.type = this.detectFileType(file.name);

      if (this.type === FileType.PDF) {

      } else {
        reader.addEventListener('load', this.imageReader);
        reader.readAsDataURL(file);
      }
    }
  }

  get imageReader() {
    return (e)=> {
      this.dataURL = e.target.result;
      this.callback(this);
    }
  }
}