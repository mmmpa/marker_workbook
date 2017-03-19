// @flow

import IDMan from '../lib/decorators/id-man';
import Marker from './marker';

@IDMan
export default class PageMeta {
  pagePosition: Position;
  sheetPosition: Position;
  markers: Marker[];
  version: number;
  markerVersion: number;

  constructor () {
    this.pagePosition = { x: 0, y: 0 };
    this.sheetPosition = { x: 0, y: 0 };
    this.markers = [];
    this.version = 0;
    this.markerVersion = 0;
  }

  update (): void {
    this.version++;
  }

  updateMarker (): void {
    this.markerVersion++;
  }

  resetPosition (): void {
    this.pagePosition = { x: 0, y: 0 };
    this.sheetPosition = { x: 0, y: 0 };
    this.update();
  }

  newMarker ({ x, y, thickness = 40, length = 0, rotation = 0 }: MarkerParameters): Marker {
    const newMarker = new Marker({x, y, length, thickness, rotation});
    this.markers.push(newMarker);
    return newMarker;
  }

  removeMarker (marker: Marker): void {
    this.markers = this.markers.filter(m => m.id !== marker.id);
    this.updateMarker();
  }

  moveSheet ({ x, y }: Position): void {
    this.sheetPosition.x += x;
    this.sheetPosition.y += y;
  }

  movePage ({ x, y }: Position): void {
    this.pagePosition.x += x;
    this.pagePosition.y += y;
  }

  get forJSON (): any {
    const { pagePosition, sheetPosition, markers } = this;
    return {
      pagePosition,
      sheetPosition,
      markers: markers.map(marker => marker.forJSON),
    };
  }

  static fromJSON (data): PageMeta {
    const page = new PageMeta();
    page.pagePosition = data.pagePosition;
    page.sheetPosition = data.sheetPosition;
    page.markers = data.markers.map(markerData => Marker.fromJSON(markerData));

    return page;
  }
}
