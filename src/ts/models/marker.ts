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

  wrapperCSS(scale) {
    let {x, y, rotation, length, thickness} = this;
    return {
      left: x * scale,
      top: (y - this.thickness / 2) * scale,
      transform: `rotate(${rotation}deg)`
    }
  }

  innerCSS(scale) {
    let {x, y, rotation, length, thickness} = this;
    return {
      width: length * scale,
      height: thickness * scale
    }
  }

  get radian() {
    return this.rotation * Math.PI / 180;
  }

  get forJSON() {
    let {x, y, length, rotation, thickness} = this;

    return {x, y, length, rotation, thickness}
  }

  static fromJSON(data) {
    let {x, y, length, thickness, rotation} = data;
    return new Marker(x, y, length, thickness, rotation);
  }
}