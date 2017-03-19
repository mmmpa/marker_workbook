// @flow

type StoredPage = { dataURL: string, size: Size }

function setupCanvas (viewport) {
  const canvas = document.createElement('canvas');
  const canvasContext = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  return { canvas, canvasContext };
}

export default class PDFPager {
  pdf: any;
  pageStore: StoredPage[][];

  constructor ({ pdf }: {pdf: any}) {
    this.pdf = pdf;
    this.pageStore = [];
  }

  page ({ pageNumber: number, scale, callback }: PagingParameters): void {
    const pageNumber = this.normalizePageNumber(number);
    const stored = this.pick(pageNumber, scale);

    if (stored) {
      const {
        size,
        dataURL,
      } = stored;

      callback({ pageNumber, size, dataURL });
      return;
    }

    this.pdf.getPage(pageNumber).then((page) => {
      const viewport = page.getViewport(scale);
      const { canvas, canvasContext } = setupCanvas(viewport);

      page.render({ canvasContext, viewport }).promise.then(() => {
        const {
          width,
          height,
        } = viewport;

        const dataURL = canvas.toDataURL();
        const size = { width, height }

        this.store(pageNumber, scale, dataURL, size);

        callback({ pageNumber, size, dataURL });
      });
    });
  }

  get pageCount (): number {
    return this.pdf.numPages;
  }

  // private

  store (pageNumber: number, scale: number, dataURL: string, size: Size): void {
    if (!this.pageStore[pageNumber]) {
      this.pageStore[pageNumber] = [];
    }

    this.pageStore[pageNumber][scale] = { dataURL, size };
  }

  pick (pageNumber: number, scale: number): ?StoredPage {
    return this.pageStore[pageNumber]
      ? this.pageStore[pageNumber][scale]
      : null;
  }

  normalizePageNumber (n: number): number {
    switch (true) {
      case n < 1:
        return 1;
      case n > this.pageCount:
        return this.pageCount;
      default:
        return n;
    }
  }
}
