// @flow

export default class ImagePager {
  width: number;
  height: number;
  dataURL: string;
  scale: number;
  pageNumber: number;
  pageCount: number;

  constructor ({ image, dataURL }: {image: Image, dataURL: string}) {
    this.width = image.width;
    this.height = image.height;
    this.dataURL = dataURL;

    this.pageNumber = 1;
    this.pageCount = 1;

    this.scale = 1;
  }

  page ({ scale, callback }: PagingParameters) {
    this.scale = scale;

    const {
      pageNumber,
      size,
      dataURL,
    } = this;

    callback({ pageNumber, size, dataURL })
  }

  get size (): Size {
    return {
      width: this.width * this.scale,
      height: this.height * this.scale,
    }
  }
}
