export default class PDFHandler {
  pageStore:any[] = [];

  constructor(private pdf:any) {
  }

  setupCanvas(viewport) {
    let canvas = document.createElement('canvas');
    let canvasContext = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    return {canvas, canvasContext};
  }

  get pageCount() {
    return this.pdf.numPages
  }

  store(pageNumber, scale, dataURL, viewport) {
    let {width, height} = viewport;
    if (!this.pageStore[pageNumber]) {
      this.pageStore[pageNumber] = [];
    }
    this.pageStore[pageNumber][scale] = {dataURL, size: {width, height}};
  }

  pick(pageNumber, scale) {
    if (!this.pageStore[pageNumber]) {
      return null;
    }
    return this.pageStore[pageNumber][scale];
  }

  page(n, scale, callback:(pageNumber, size, dataURL)=>void) {
    let pageNumber = n;
    if (n < 1) {
      pageNumber = 1;
    } else if (n > this.pageCount) {
      pageNumber = this.pageCount
    }

    let stored = this.pick(pageNumber, scale);
    if (!!stored) {
      return callback(pageNumber, stored.size, stored.dataURL);
    }

    this.pdf.getPage(pageNumber).then((page)=> {
      let viewport = page.getViewport(scale);
      let {canvas, canvasContext} = this.setupCanvas(viewport);

      page.render({canvasContext, viewport}).promise.then((e)=> {
        let dataURL = canvas.toDataURL();
        this.store(pageNumber, scale,  dataURL, viewport);
        callback(pageNumber, {width: viewport.width, height: viewport.height}, dataURL);
      });
    })
  }
}