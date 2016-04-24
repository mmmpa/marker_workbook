export default class PDFHandler {
  pageStore:any[] = [];

  constructor(private pdf) {

  }

  setupCanvas(viewport){
    let canvas = document.createElement('canvas');
    let canvasContext = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    return {canvas, canvasContext};
  }

  page(n, callback) {
    if (!!this.pageStore[n]) {
      return callback(this.pageStore[n]);
    }

    this.pdf.getPage(n).then((page)=> {
      let viewport = page.getViewport(2);
      let {canvas, canvasContext} = this.setupCanvas(viewport)

      page.render({canvasContext, viewport}).promise.then(()=> {
        this.pageStore[n] = canvas.toDataURL();
        callback(canvas.toDataURL());
      });
    })
  }
}