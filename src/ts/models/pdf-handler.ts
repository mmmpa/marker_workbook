export default class PDFHandler {
  pageStore:any[] = [];

  constructor(private pdf) {
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

  store(pageNumber, dataURL, viewport) {
    let {width, height} = viewport;
    this.pageStore[pageNumber] = {dataURL, width, height};
  }

  page(n, callback:(pageNumber, dataURL)=>void) {
    let pageNumber = n;
    if (n < 1) {
      pageNumber = 1;
    } else if (n > this.pageCount) {
      pageNumber = this.pageCount
    }

    let stored = this.pageStore[pageNumber];
    if (!!stored) {
      return callback(pageNumber, stored.dataURL);
    }

    this.pdf.getPage(pageNumber).then((page)=> {
      let viewport = page.getViewport(2);
      let {canvas, canvasContext} = this.setupCanvas(viewport);

      page.render({canvasContext, viewport}).promise.then(()=> {
        let dataURL = canvas.toDataURL();
        this.store(pageNumber, dataURL, viewport);
        callback(pageNumber, dataURL);
      });
    })
  }
}