// @flow

import changeCase from 'change-case';
import { FileType } from '../constants/constants';
import PDFPager from './pdf-pager';
import ImagePager from './image-pager';

declare var PDFJS: any;
declare var $: any;

PDFJS.workerSrc = './js/pdf.worker.js';
PDFJS.cMapUrl = './cmaps/';
PDFJS.cMapPacked = true;

export default class FileHandler {
  succeed: () => void;
  fail: () => void;
  file: File;

  constructor ({ succeed, fail }: {succeed: () => void, fail: () => void}) {
    this.succeed = succeed
    this.fail = fail
  }

  run (): void {
    const $fileListener = $('<input type="file"/>');

    $fileListener.bind('change', e => this.read(e.target.files[0]));
    $fileListener.trigger('click');
  }

  // private

  read (file: File): void {
    this.file = file;

    const reader = new FileReader();

    if (this.type === FileType.PDF) {
      reader.addEventListener('load', this.pdfReader);
      reader.readAsArrayBuffer(file);
    } else {
      reader.addEventListener('load', this.imageReader);
      reader.readAsDataURL(file);
    }
  }

  complete (pager: Pager) {
    this.succeed(pager)
  }

  extension (): string {
    const ex = this.file.name.replace(/\?.*/, '').replace(/#.*/, '').replace(/.*\./, '');
    return changeCase.lowerCase(ex);
  }

  get type (): string {
    switch (this.extension) {
      case 'pdf':
        return FileType.PDF;
      default:
        return FileType.Image;
    }
  }

  get pdfReader (): (e: any) => void {
    return (e: any) => PDFJS.getDocument(e.target.result).then(pdf => this.succeed(new PDFPager({ pdf })));
  }

  get imageReader (): (e: any) => void {
    return (e: any) => {
      const image = new Image();
      const dataURL = e.target.result;

      image.addEventListener('load', () => this.succeed(new ImagePager({ image, dataURL })));
      image.src = dataURL;
    };
  }
}
