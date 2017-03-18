import Marker from './marker';
import IDMan from './id-man';

export default class Page extends IDMan {
  constructor () {
    super();

    this.pagePosition = { x: 0, y: 0 };
    this.sheetPosition = { x: 0, y: 0 };
    this.markers = [];
    this.version = 0;
    this.markerVersion = 0;
  }

  update () {
    this.version++;
  }

  updateMarker () {
    this.markerVersion++;
  }

  resetPosition () {
    this.pagePosition = { x: 0, y: 0 };
    this.sheetPosition = { x: 0, y: 0 };
    this.update();
  }

  newMarker (x, y, thickness = 40, length = 0, rotation = 0): Marker {
    const newMarker = new Marker(x, y, length, thickness, rotation);
    this.markers.push(newMarker);
    return newMarker;
  }

  removeMarker (marker) {
    this.markers = this.markers.filter(m => m.id !== marker.id);
    this.updateMarker();
  }

  moveSheet (moveX, moveY) {
    this.sheetPosition.x += moveX;
    this.sheetPosition.y += moveY;
  }

  movePage (moveX, moveY) {
    this.pagePosition.x += moveX;
    this.pagePosition.y += moveY;
  }

  get forJSON () {
    const { pagePosition, sheetPosition, markers } = this;
    return {
      pagePosition,
      sheetPosition,
      markers: markers.map(marker => marker.forJSON),
    };
  }

  static fromJSON (data) {
    const page = new Page();
    page.pagePosition = data.pagePosition;
    page.sheetPosition = data.sheetPosition;
    page.markers = data.markers.map(markerData => Marker.fromJSON(markerData));

    return page;
  }
}
