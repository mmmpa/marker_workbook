// @flow

export default class ImagePager {
  width: number;
  height: number;
  dataURL: string;
  scale: number;

  constructor ({ image, dataURL }: {image: Image, dataURL: string}) {
    this.width = image.width;
    this.height = image.height;
    this.dataURL = dataURL;

    this.scale = 1;
  }

  page ({ scale, callback }: PagingParameters) {
    this.scale = scale;

    const pageNumber = 1;

    const {
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

  get pageCount (): number {
    return 1;
  }
}
