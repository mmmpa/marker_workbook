import IDMan from './id-man';

export default class Marker extends IDMan {
  constructor ({x, y, length, thickness, rotation}) {
    super();

    this.x = x;
    this.y = y;
    this.length = length;
    this.thickness = thickness;
    this.rotation = rotation;
  }

  getEnd () {
    const {
      x,
      y,
      radian,
      length,
    } = this;

    const endX = x + Math.cos(radian) * length;
    const endY = y + Math.sin(radian) * length;

    return { endX, endY };
  }

  to (x, y) {
    const moveX = x - this.x;
    const moveY = y - this.y;

    this.rotation = Math.atan2(moveY, moveX) * 180 / Math.PI;
    this.length = Math.sqrt(moveX * moveX + moveY * moveY);
  }

  wrapperCSS (scale) {
    const {
      x,
      y,
      rotation,
    } = this;

    return {
      left: x * scale,
      top: (y - this.thickness / 2) * scale,
      transform: `rotate(${rotation}deg)`,
    };
  }

  innerCSS (scale) {
    const {
      length,
      thickness,
    } = this;

    return {
      width: length * scale,
      height: thickness * scale,
    };
  }

  get radian () {
    return this.rotation * Math.PI / 180;
  }

  get forJSON () {
    const { x, y, length, rotation, thickness } = this;
    return { x, y, length, rotation, thickness };
  }

  static fromJSON (data) {
    const { x, y, length, thickness, rotation } = data;
    return new Marker(x, y, length, thickness, rotation);
  }
}
