import Marker from "./marker";
import IDMan from "./id-man";

export default class Page extends IDMan {
  pagePosition:any = {x: 0, y: 0};
  sheetPosition:any = {x: 0, y: 0};
  markers:Marker[] = [new Marker(0, 0, 100, 40, 0)];

  version:number = 0;

  constructor() {
    super();
  }

  moveSheet(moveX, moveY) {
    this.sheetPosition.x += moveX;
    this.sheetPosition.y += moveY;
  }

  movePage(moveX, moveY) {
    this.pagePosition.x += moveX;
    this.pagePosition.y += moveY;
  }
}