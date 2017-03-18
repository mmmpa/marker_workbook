export default class PDFHandler {
  pageStore: any[] = [];

  constructor (pdf: any) {
    this.pdf = pdf;
  }

  setupCanvas (viewport) {
    const canvas = document.createElement('canvas');
    const canvasContext = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    return { canvas, canvasContext };
  }

  get pageCount () {
    return this.pdf.numPages;
  }

  store (pageNumber, scale, dataURL, viewport) {
    const {
      width,
      height,
    } = viewport;

    if (!this.pageStore[pageNumber]) {
      this.pageStore[pageNumber] = [];
    }

    this.pageStore[pageNumber][scale] = { dataURL, size: { width, height } };
  }

  pick (pageNumber, scale) {
    if (!this.pageStore[pageNumber]) {
      return null;
    }
    return this.pageStore[pageNumber][scale];
  }

  normalizePageNumber (n) {
    if (n < 1) {
      return 1;
    } else if (n > this.pageCount) {
      return this.pageCount;
    }
    return n;
  }

  page (n, scale, callback) {
    const pageNumber = this.normalizePageNumber(n);
    const stored = this.pick(pageNumber, scale);

    if (stored) {
      return callback(pageNumber, stored.size, stored.dataURL);
    }

    this.pdf.getPage(pageNumber).then((page) => {
      const viewport = page.getViewport(scale);
      const { canvas, canvasContext } = this.setupCanvas(viewport);

      page.render({ canvasContext, viewport }).promise.then(() => {
        const dataURL = canvas.toDataURL();
        this.store(pageNumber, scale, dataURL, viewport);
        callback(pageNumber, { width: viewport.width, height: viewport.height }, dataURL);
      });
    });

    return null;
  }
}
