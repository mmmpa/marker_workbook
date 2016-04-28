import Marker from "./marker";
import IDMan from "./id-man";

export default class Page extends IDMan {
  pagePosition:any = {x: 210, y: 50};
  sheetPosition:any = {x: 0, y: 0};
  markers:Marker[] = [];

  version:number = 0;

  constructor() {
    super();
  }

  update() {
    this.version++;
  }

  newMarker(x, y, thickness = 40, length = 0, rotation = 0):Marker {
    let newMarker = new Marker(x, y, 0, thickness, 0);
    this.markers.push(newMarker);
    return newMarker;
  }

  moveSheet(moveX, moveY) {
    this.sheetPosition.x += moveX;
    this.sheetPosition.y += moveY;
  }

  movePage(moveX, moveY) {
    this.pagePosition.x += moveX;
    this.pagePosition.y += moveY;
  }

  get forJSON() {
    let {pagePosition, sheetPosition, markers} = this;
    return {
      pagePosition,
      sheetPosition,
      markers: markers.map((marker)=> marker.forJSON)
    }
  }

  static fromJSON(data) {
    let page = new Page();
    page.pagePosition = data.pagePosition;
    page.sheetPosition = data.sheetPosition;
    page.markers = data.markers.map((markerData)=> Marker.fromJSON(markerData));

    return page;
  }
}