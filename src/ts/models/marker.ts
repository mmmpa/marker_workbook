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

  get css() {
    let {x, y, rotation, length, thickness} = this;
    return {
      left: x,
      top: y,
      width: length,
      height: thickness,
      transform: `rotate(${rotation}deg)`
    }
  }

  get radian() {
    return this.rotation * Math.PI / 180;
  }
}