import * as changeCase from 'change-case';
import { FileType } from '../constants/constants';
import PDFHandler from './pdf-handler';

PDFJS.workerSrc = './js/pdf.worker.js';
PDFJS.cMapUrl = './cmaps/';
PDFJS.cMapPacked = true;

export default class FileHandler {
  type: FileType;

  dataURL: string;
  width: number;
  height: number;

  pdf: any;
  file: File;

  constructor (callback, fileName = null) {
    if (fileName) {
      this.file = new File([''], fileName);
      this.type = this.detectFileType(this.file.name);
      if (this.type === FileType.PDF) {
        PDFJS.getDocument(fileName).then((pdf) => {
          this.pdf = new PDFHandler(pdf);
          this.callback(this);
        });
      } else {

      }
    }
  }

  getExtension (fileName) {
    const ex = fileName.replace(/\?.*/, '').replace(/#.*/, '').replace(/.*\./, '');
    return changeCase.lowerCase(ex);
  }

  detectFileType (fileName) {
    switch (this.getExtension(fileName)) {
      case 'pdf':
        return FileType.PDF;
      default:
        return FileType.Image;
    }
  }

  get name () {
    return this.file.name;
  }

  get key () {
    return [this.name, this.file.size, this.file.type || this.type].join('_');
  }

  get isPDF (): boolean {
    return !!this.pdf;
  }

  get inputHandler () {
    return (e) => {
      this.handleFile(e.target.files[0]);
    };
  }

  handleFile (file) {
    this.file = file;
    const reader = new FileReader();
    this.type = this.detectFileType(file.name);

    if (this.type === FileType.PDF) {
      reader.addEventListener('load', this.pdfReader);
      reader.readAsArrayBuffer(file);
    } else {
      reader.addEventListener('load', this.imageReader);
      reader.readAsDataURL(file);
    }
  }

  get pdfReader () {
    return (e) => {
      PDFJS.getDocument(e.target.result).then((pdf) => {
        this.pdf = new PDFHandler(pdf);
        this.callback(this);
      });
    };
  }

  get imageReader () {
    return (e) => {
      this.dataURL = e.target.result;
      const img = new Image();
      img.addEventListener('load', (e) => {
        this.width = img.width;
        this.height = img.height;
        this.callback(this);
      });
      img.src = this.dataURL;
    };
  }
}
