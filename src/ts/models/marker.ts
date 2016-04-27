import IDMan from "./id-man";
export default class Marker extends IDMan {
  constructor(public x, public y, public length, public thickness, public rotation) {
    super();
  }

  getEnd() {
    let {x, y, radian, length} = this;

    let endX = x + Math.cos(radian) * length;
    let endY = y + Math.sin(radian) * length;

    return {endX, endY};
  }

  to(x, y) {
    let moveX = x - this.x;
    let moveY = y - this.y;

    this.rotation = Math.atan2(moveY, moveX) * 180 / Math.PI;
    this.length = Math.sqrt(moveX * moveX + moveY * moveY);
  }

  get wrapperCSS() {
    let {x, y, rotation, length, thickness} = this;
    return {
      left: x,
      top: y - this.thickness / 2,
      transform: `rotate(${rotation}deg)`
    }
  }

  get innerCSS() {
    let {x, y, rotation, length, thickness} = this;
    return {
      width: length,
      height: thickness
    }
  }

  get radian() {
    return this.rotation * Math.PI / 180;
  }

  get forJSON() {
    let {x, y, length, rotation} = this;

    return {x, y, length, rotation}
  }
}