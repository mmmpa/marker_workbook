import * as changeCase from 'change-case';
import {FileType} from "../constants/constants";
import PDFHandler from "./pdf-handler";

declare const PDFJS:any;
PDFJS.workerSrc = './js/pdf.worker.js';
PDFJS.cMapUrl = "./cmaps/";
PDFJS.cMapPacked = true;

export default class FileHandler {
  public type:FileType;
  public dataURL:string;
  public typedArray:any;
  public pdf:any;
  private file:File;

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

  get name() {
    return this.file.name;
  }

  get key() {
    return [this.name, this.file.size, this.file.type].join('_');
  }

  get isPDF():boolean {
    return !!this.pdf
  }

  get handler() {
    return (e)=> {
      this.file = e.target.files[0];
      let reader = new FileReader();
      this.type = this.detectFileType(this.file.name);

      if (this.type === FileType.PDF) {
        reader.addEventListener('load', this.pdfReader);
        reader.readAsArrayBuffer(this.file);
      } else {
        reader.addEventListener('load', this.imageReader);
        reader.readAsDataURL(this.file);
      }
    }
  }

  get pdfReader() {
    return (e)=> {
      let typedArray = new Uint8Array(e.target.result);
      PDFJS.getDocument(typedArray).then((pdf)=> {
        this.pdf = new PDFHandler(pdf);
        this.callback(this);
      })
    }
  }

  get imageReader() {
    return (e)=> {
      this.dataURL = e.target.result;
      this.callback(this);
    }
  }
}